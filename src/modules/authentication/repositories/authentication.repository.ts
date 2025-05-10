import { UserEntity } from "@sitemapy/interfaces";

export interface AuthenticationRepository {
  login(params: {
    email: string;
    password: string;
  }): Promise<RepositoryResponse<UserEntity>>;

  signup(params: {
    email: string;
    password: string;
  }): Promise<RepositoryResponse<UserEntity>>;

  is_authenticated(): Promise<UserEntity | null>;

  login_with_google(params: {
    language: string;
  }): Promise<RepositoryResponse<{ user: UserEntity }>>;

  logout(): Promise<unknown>;

  forgot_password(params: {
    email: string;
    callback_url: string;
    language?: string;
  }): Promise<RepositoryResponse<unknown>>;

  reset_password(params: {
    email: string;
    password: string;
    token: string;
  }): Promise<RepositoryResponse<unknown>>;
}
