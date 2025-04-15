import { ErrorEntity, UserEntity } from "@sitemapy/interfaces";

export interface AuthenticationRepository {
  login(params: {
    email: string;
    password: string;
  }): Promise<
    { error: true; code: string } | { error: false; body: UserEntity }
  >;

  signup(params: {
    email: string;
    password: string;
  }): Promise<
    { error: true; code: string } | { error: false; body: UserEntity }
  >;

  is_authenticated(): Promise<UserEntity | null>;

  login_with_google(params: { language?: string }): Promise<
    | {
        error: true;
        code: ErrorEntity;
      }
    | {
        error: false;
        body: {
          user: UserEntity;
        };
      }
  >;

  logout(): Promise<void>;
}
