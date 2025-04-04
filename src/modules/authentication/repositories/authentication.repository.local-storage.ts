import { UserEntity } from "@/modules/authentication/entities/authentication.entity";
import { AuthenticationRepository } from "@/modules/authentication/repositories/authentication.repository";

export class AuthenticationRepositoryLocalStorage
  implements AuthenticationRepository
{
  constructor() {
    this._set_users([
      ...this._get_users(),
      {
        id: "admin@admin.com",
        email: "admin@admin.com",
        password: "adminadmin",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  }

  private readonly KEY = "users";
  private readonly KEY_AUTHENTICATED = "user_authenticated";

  private _get_users(): UserEntity[] {
    return JSON.parse(localStorage.getItem(this.KEY) || "[]");
  }

  private _set_users(users: UserEntity[]) {
    const unique_users = new Map();

    users.forEach((user) => {
      unique_users.set(user.email, user);
    });

    localStorage.setItem(
      this.KEY,
      JSON.stringify(Array.from(unique_users.values()))
    );
  }

  private _set_authenticated_user(user: UserEntity | null) {
    if (user) {
      localStorage.setItem(this.KEY_AUTHENTICATED, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.KEY_AUTHENTICATED);
    }
  }

  async login(params: {
    email: string;
    password: string;
  }): Promise<
    { error: true; code: string } | { error: false; body: UserEntity }
  > {
    const user = this._get_users().find((user) => user.email === params.email);

    if (!user) {
      return { error: true, code: "User not found" };
    }

    if (user.password !== params.password) {
      return { error: true, code: "Invalid password" };
    }

    this._set_authenticated_user(user);

    return { error: false, body: user };
  }

  async signup(params: {
    email: string;
    password: string;
  }): Promise<
    { error: true; code: string } | { error: false; body: UserEntity }
  > {
    const user = this._get_users().find((user) => user.email === params.email);

    if (user) {
      return { error: true, code: "User already exists" };
    }

    const newUser = {
      ...params,
      id: params.email,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this._set_users([...this._get_users(), newUser]);

    return { error: false, body: newUser };
  }

  async logout(): Promise<void> {
    this._set_authenticated_user(null);
  }

  async is_authenticated(): Promise<UserEntity | null> {
    const user = JSON.parse(
      localStorage.getItem(this.KEY_AUTHENTICATED) || "null"
    );

    return user ?? null;
  }
}
