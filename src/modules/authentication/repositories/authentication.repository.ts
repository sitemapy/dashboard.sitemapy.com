import { UserEntity } from "@/modules/authentication/entities/authentication.entity";

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

  logout(): Promise<void>;
}
