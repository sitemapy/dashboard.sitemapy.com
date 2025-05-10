import { AuthenticationRepository } from "@/modules/authentication/repositories/authentication.repository";
import { ErrorEntity, UserEntity } from "@sitemapy/interfaces";

export class AuthenticationRepositoryInMemory
  implements AuthenticationRepository
{
  private users: UserEntity[] = [];
  private authenticated_user: UserEntity | null = null;

  async login(params: {
    email: string;
    password: string;
  }): ReturnType<AuthenticationRepository["login"]> {
    const user = this.users.find((user) => user.email === params.email);

    if (!user) {
      return { error: true, code: "User not found" };
    }

    if (user.password !== params.password) {
      return { error: true, code: "Invalid password" };
    }

    this.authenticated_user = user;

    return { error: false, body: user };
  }

  async forgot_password(): ReturnType<
    AuthenticationRepository["forgot_password"]
  > {
    return { error: false, body: {} };
  }

  async login_with_google(): Promise<
    | { error: true; code: ErrorEntity }
    | { error: false; body: { user: UserEntity } }
  > {
    const user = this.users[0];

    if (!user) return { error: true, code: ErrorEntity.USER_NOT_FOUND };

    this.authenticated_user = user;

    return { error: false, body: { user } };
  }

  async signup(params: {
    email: string;
    password: string;
  }): ReturnType<AuthenticationRepository["signup"]> {
    const user = this.users.find((user) => user.email === params.email);

    if (user) {
      return { error: true, code: "User already exists" };
    }

    const newUser: UserEntity = {
      ...params,
      id: params.email,
      created_at: new Date(),
      updated_at: new Date(),
      language: "en",
    };

    this.users.push(newUser);

    return { error: false, body: newUser };
  }

  async logout(): ReturnType<AuthenticationRepository["logout"]> {
    this.authenticated_user = null;

    return { error: false, body: {} };
  }

  async is_authenticated(): ReturnType<
    AuthenticationRepository["is_authenticated"]
  > {
    return this.authenticated_user ?? null;
  }
}
