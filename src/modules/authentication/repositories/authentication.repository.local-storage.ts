import { AuthenticationRepository } from "@/modules/authentication/repositories/authentication.repository";
import { ErrorEntity, UserEntity } from "@sitemapy/interfaces";

export class AuthenticationRepositoryLocalStorage
  implements AuthenticationRepository
{
  private readonly KEY = "users";
  private readonly KEY_AUTHENTICATED = "user_authenticated";
  private readonly KEY_FORGOT_PASSWORD_REQUESTS = "forgot_password_requests";
  constructor(params?: { users: Array<UserEntity> }) {
    this._set_users([
      ...this._get_users(),
      {
        id: "admin@admin.com",
        email: "admin@admin.com",
        password: "adminadmin",
        created_at: new Date(),
        updated_at: new Date(),
        language: "en",
      },
      ...(params?.users || []),
    ]);
  }

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

  async login_with_google(): Promise<RepositoryResponse<{ user: UserEntity }>> {
    const user = this._get_users()[0];

    if (!user) return { error: true, code: ErrorEntity.USER_NOT_FOUND };

    this._set_authenticated_user(user);

    return { error: false, body: { user } };
  }

  async login(params: {
    email: string;
    password: string;
  }): Promise<RepositoryResponse<UserEntity>> {
    const user = this._get_users().find((user) => user.email === params.email);

    if (!user) {
      return { error: true, code: ErrorEntity.USER_NOT_FOUND };
    }

    if (user.password !== params.password) {
      return { error: true, code: ErrorEntity.USER_NOT_FOUND };
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

    const newUser: UserEntity = {
      ...params,
      id: params.email,
      language: "en",
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

  private _get_forgot_password_requests(): {
    email: string;
    callback_url: string;
    token: string;
  }[] {
    return JSON.parse(
      localStorage.getItem(this.KEY_FORGOT_PASSWORD_REQUESTS) || "[]"
    );
  }

  private _set_forgot_password_requests(
    requests: {
      email: string;
      callback_url: string;
      token: string;
    }[]
  ) {
    localStorage.setItem(
      this.KEY_FORGOT_PASSWORD_REQUESTS,
      JSON.stringify(requests)
    );
  }

  async forgot_password(params: {
    email: string;
    callback_url: string;
    token: string;
  }): ReturnType<AuthenticationRepository["forgot_password"]> {
    this._set_forgot_password_requests([
      ...this._get_forgot_password_requests(),
      {
        email: params.email,
        callback_url: params.callback_url,
        token: params.token,
      },
    ]);

    return { error: false, body: {} };
  }

  async reset_password(params: {
    email: string;
    password: string;
    token: string;
  }): Promise<RepositoryResponse<unknown>> {
    const find_forgot_password_request =
      this._get_forgot_password_requests().find(
        (request) =>
          request.email === params.email && request.token === params.token
      );

    if (!find_forgot_password_request) {
      return { error: true, code: ErrorEntity.FORGOT_PASSWORD_INVALID_TOKEN };
    }

    const user = this._get_users().find((user) => user.email === params.email);

    if (!user) {
      return { error: true, code: ErrorEntity.USER_NOT_FOUND };
    }

    this._set_users(
      this._get_users().map((user) =>
        user.email === params.email
          ? { ...user, password: params.password }
          : user
      )
    );

    return { error: false, body: {} };
  }
}
