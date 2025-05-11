import { ApiService } from "@/modules/api/services/api.service";
import { AuthenticationRepository } from "@/modules/authentication/repositories/authentication.repository";
import { ApiResponses, ErrorEntity, UserEntity } from "@sitemapy/interfaces";

export class AuthenticationRepositoryApi implements AuthenticationRepository {
  constructor(private apiService: ApiService) {}

  async login(params: {
    email: string;
    password: string;
  }): ReturnType<AuthenticationRepository["login"]> {
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

  async forgot_password(params: {
    email: string;
    callback_url: string;
    language: string;
  }): ReturnType<AuthenticationRepository["forgot_password"]> {
    const response = await this.apiService.post<
      ApiResponses["POST /auth/forgot-password"]
    >("/auth/forgot-password", {
      email: params.email,
      callback_url: params.callback_url,
      language: params.language,
    });

    if (response.error) {
      return { error: true, code: response.message };
    }

    return { error: false, body: response.body };
  }

  private async _login_with_google_open_browser(
    url: string
  ): Promise<RepositoryResponse<{ code: string }>> {
    return new Promise((resolve) => {
      const browser = window.open(url);

      const interval = setInterval(() => {
        if (!browser || !browser.window || browser.closed) {
          clearInterval(interval);

          return resolve({
            error: true,
            // @todo
            code: ErrorEntity.UNKNOWN_ERROR,
          });
        }

        try {
          const href = browser.window.location.href;
          const url = new URL(href);
          const code = url.searchParams.get("code") as string;

          if (href === "about:blank") {
            console.info("Google Authentication: about:blank");
          } else if (code) {
            clearInterval(interval);
            browser.close();

            return resolve({ error: false, body: { code } });
          } else {
            clearInterval(interval);
            browser.close();

            return resolve({
              error: true,
              code: ErrorEntity.UNKNOWN_ERROR,
            });
          }
        } catch (error) {
          const error_message =
            error instanceof Error ? error.message : ErrorEntity.UNKNOWN_ERROR;

          console.info(error_message);

          if (error_message.includes("Blocked")) {
            console.info(error_message);
          } else {
            return resolve({ error: true, code: error_message });
          }
        }
      }, 2000);
    });
  }

  async login_with_google(params: {
    language: string;
  }): ReturnType<AuthenticationRepository["login_with_google"]> {
    const callback_url = window.location.origin + "/authentication/callback";
    const google_url_response = await this.apiService.post<
      ApiResponses["POST /auth/google/url"]
    >("/auth/google/url", {
      callback_url,
    });

    if (google_url_response.error) {
      return { error: true, code: google_url_response.message };
    }

    const code_response = await this._login_with_google_open_browser(
      google_url_response.body.url
    );

    if (code_response.error) {
      return { error: true, code: code_response.code };
    }

    const callback_response = await this.apiService.post<
      ApiResponses["POST /auth/google/callback"]
    >("/auth/google/callback", {
      code: code_response.body.code,
      callback_url,
      language: params.language,
    });

    if (callback_response.error) {
      return { error: true, code: callback_response.message };
    }

    await this.apiService.authenticate(callback_response.body.access_token);

    return { error: false, body: { user: callback_response.body.user } };
  }

  async signup(params: {
    email: string;
    password: string;
  }): ReturnType<AuthenticationRepository["signup"]> {
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

  async reset_password(params: {
    email: string;
    password: string;
    token: string;
  }): ReturnType<AuthenticationRepository["reset_password"]> {
    const response = await this.apiService.post<
      ApiResponses["POST /auth/reset-password"]
    >("/auth/reset-password", {
      email: params.email,
      password: params.password,
      token: params.token,
    });

    if (response.error) {
      return { error: true, code: response.message };
    }

    return { error: false, body: response.body };
  }
}
