import { UserEntity } from "@/modules/authentication/entities/authentication.entity";
import { AuthenticationRepository } from "@/modules/authentication/repositories/authentication.repository";

export class AuthenticationRepositoryInMemory
  implements AuthenticationRepository
{
  private users: UserEntity[] = [];
  private authenticated_user: UserEntity | null = null;

  async login(params: {
    email: string;
    password: string;
  }): Promise<
    { error: true; code: string } | { error: false; body: UserEntity }
  > {
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

  async signup(params: {
    email: string;
    password: string;
  }): Promise<
    { error: true; code: string } | { error: false; body: UserEntity }
  > {
    const user = this.users.find((user) => user.email === params.email);

    if (user) {
      return { error: true, code: "User already exists" };
    }

    const newUser = {
      ...params,
      id: params.email,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.users.push(newUser);

    return { error: false, body: newUser };
  }

  async logout(): Promise<void> {
    this.authenticated_user = null;
  }

  async is_authenticated(): Promise<UserEntity | null> {
    return this.authenticated_user ?? null;
  }
}
