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
      ? "https://v2.api.sitemapy.com"
      : "http://localhost:3000";

  async get<T>(url: string): Promise<IApiResponse<T>> {
    const headers = {
      Authorization:
        "Bearer " + this.localStorageService.get(LOCAL_STORAGE_KEYS.TOKEN_KEY),
    };

    const response = await axios.get<T>(`${this.endpoint}${url}`, {
      headers,
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
  }

  async post<T>(url: string, data: unknown): Promise<IApiResponse<T>> {
    const headers = {
      Authorization:
        "Bearer " + this.localStorageService.get(LOCAL_STORAGE_KEYS.TOKEN_KEY),
    };

    const response = await axios.post<T>(`${this.endpoint}${url}`, data, {
      headers,
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
  }
}
