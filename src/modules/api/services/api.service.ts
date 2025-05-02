import {
  LOCAL_STORAGE_KEYS,
  LocalStorageService,
} from "@/modules/local-storage/services/local-storage.service";
import { ErrorEntity } from "@sitemapy/interfaces";
import axios from "axios";

export type IApiResponse<T> =
  | {
      error: false;
      body: T;
    }
  | {
      error: true;
      message: ErrorEntity;
    };

export class ApiService {
  constructor(private localStorageService: LocalStorageService) {
    axios.defaults.validateStatus = function (status) {
      return status < 500;
    };
  }

  private endpoint: string =
    process.env.NODE_ENV === "production"
      ? "https://v2-api.sitemapy.com"
      : "http://localhost:3000";

  private _get_headers(): Record<string, string> {
    return {
      Authorization:
        "Bearer " + this.localStorageService.get(LOCAL_STORAGE_KEYS.TOKEN_KEY),
      "x-organization-id": this.localStorageService.get(
        LOCAL_STORAGE_KEYS.ORGANIZATION_ID_KEY
      ) as string,
    };
  }

  async get<T>(url: string): Promise<IApiResponse<T>> {
    try {
      const response = await axios.get<T>(`${this.endpoint}${url}`, {
        headers: this._get_headers(),
        validateStatus: () => true,
      });

      if (response.status !== 200) {
        return {
          error: true,
          message: (response.data as { message: ErrorEntity }).message,
        };
      }

      return {
        error: false,
        body: response.data,
      };
    } catch (error) {
      return {
        error: true,
        message: (error as Error).message as ErrorEntity,
      };
    }
  }

  async post<T>(url: string, data: unknown): Promise<IApiResponse<T>> {
    try {
      const response = await axios.post<T>(`${this.endpoint}${url}`, data, {
        headers: this._get_headers(),
        validateStatus: () => true,
      });

      if (response.status > 299) {
        return {
          error: true,
          message: (response.data as { message: ErrorEntity }).message,
        };
      }

      return {
        error: false,
        body: response.data,
      };
    } catch (error) {
      return {
        error: true,
        message: (error as Error).message as ErrorEntity,
      };
    }
  }

  async logout() {
    this.localStorageService.delete(LOCAL_STORAGE_KEYS.TOKEN_KEY);
  }

  async authenticate(token: string) {
    this.localStorageService.set(LOCAL_STORAGE_KEYS.TOKEN_KEY, token);
  }
}
