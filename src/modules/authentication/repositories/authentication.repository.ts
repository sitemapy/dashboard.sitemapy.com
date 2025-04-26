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
    language?: string;
  }): Promise<RepositoryResponse<{ user: UserEntity }>>;

  logout(): Promise<void>;
}
