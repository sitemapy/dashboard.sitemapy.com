import { ApiService } from "@/modules/api/services/api.service";
import { AuthenticationRepository } from "@/modules/authentication/repositories/authentication.repository";
import { ApiResponses, UserEntity } from "@sitemapy/interfaces";

export class AuthenticationRepositoryApi implements AuthenticationRepository {
  constructor(private apiService: ApiService) {}

  async login(params: {
    email: string;
    password: string;
  }): Promise<RepositoryResponse<UserEntity>> {
    const response = await this.apiService.post<
      ApiResponses["POST /auth/login"]
    >("/auth/login", {
      email: params.email,
      password: params.password,
    });

    if (response.error) {
      return { error: true, code: response.message };
    }

    await this.apiService.authenticate(response.body.access_token);

    return { error: false, body: response.body.user };
  }

  async login_with_google(): Promise<RepositoryResponse<{ user: UserEntity }>> {
    const response = await this.apiService.post<
      ApiResponses["POST /auth/google/callback"]
    >("/auth/google/callback", {});

    if (response.error) {
      return { error: true, code: response.message };
    }

    return { error: false, body: { user: response.body.user } };
  }

  async signup(params: {
    email: string;
    password: string;
  }): Promise<RepositoryResponse<UserEntity>> {
    const response = await this.apiService.post<
      ApiResponses["POST /auth/signup"]
    >("/auth/signup", {
      email: params.email,
      password: params.password,
    });

    if (response.error) {
      return { error: true, code: response.message };
    }

    return { error: false, body: response.body.user };
  }

  async logout(): Promise<void> {
    await this.apiService.logout();
  }

  async is_authenticated(): Promise<UserEntity | null> {
    const response = await this.apiService.get<ApiResponses["GET /auth/me"]>(
      "/auth/me"
    );

    if (response.error) {
      return null;
    }

    return response.body.user;
  }
}
