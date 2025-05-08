import { Database } from "@/database.types";
import { AuthenticationRepository } from "@/modules/authentication/repositories/authentication.repository";
import { LOCAL_STORAGE_KEYS } from "@/modules/local-storage/services/local-storage.service";
import { ErrorEntity, UserEntity } from "@sitemapy/interfaces";
import { SupabaseClient } from "@supabase/supabase-js";

export class AuthenticationRepositorySupabase
  implements AuthenticationRepository
{
  constructor(private supabase: SupabaseClient<Database>) {}

  async login(params: {
    email: string;
    password: string;
  }): Promise<RepositoryResponse<UserEntity>> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: params.email,
      password: params.password,
    });

    if (error) {
      return { error: true, code: error.message };
    }

    const jwt = data.session.access_token;

    if (jwt) {
      window.localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN_KEY, jwt);
    }

    const user: UserEntity = {
      id: data.user.id,
      email: data.user.email!,
      password: params.password,
      language: "en",
      created_at: new Date(data.user.created_at!),
      updated_at: new Date(data.user.updated_at!),
    };

    return {
      error: false,
      body: user,
    };
  }

  async login_with_google(): Promise<RepositoryResponse<{ user: UserEntity }>> {
    const { error } = await this.supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:8000",
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      return { error: true, code: error.message };
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      error: true,
      code: ErrorEntity.USER_NOT_FOUND,
    };
  }

  async signup(params: {
    email: string;
    password: string;
  }): Promise<RepositoryResponse<UserEntity>> {
    const { data, error } = await this.supabase.auth.signUp({
      email: params.email,
      password: params.password,
    });

    if (error) {
      return { error: true, code: error.message };
    }

    if (!data.user) {
      return { error: true, code: ErrorEntity.USER_NOT_FOUND };
    }

    return {
      error: false,
      body: {
        id: data?.user.id ?? "",
        email: data?.user.email ?? "",
        password: params.password,
        language: "en",
        created_at: new Date(),
        updated_at: new Date(),
      },
    };
  }

  async logout(): Promise<void> {
    await this.supabase.auth.signOut();
  }

  async is_authenticated(): Promise<UserEntity | null> {
    const user = await this.supabase.auth.getUser();
    const session = await this.supabase.auth.getSession();

    const jwt = session.data.session?.access_token;

    if (jwt) {
      window.localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN_KEY, jwt);
    }

    if (!user.data.user) {
      return null;
    }

    return {
      id: user.data.user.id,
      email: user.data.user.email!,
      password: "",
      language: "en",
      created_at: new Date(user.data.user.created_at!),
      updated_at: new Date(user.data.user.updated_at!),
    };
  }
}
