import { ApiResponses } from "@sitemapy/interfaces";
import { ApiService } from "../services/api.service";
import { ApiRepository } from "./api.repository";

export class ApiRepositoryApi implements ApiRepository {
  constructor(private apiService: ApiService) {}

  async fetch_logs(params: {
    organization_id: string;
    current_page: number;
    how_many_logs_per_page: number;
  }): ReturnType<ApiRepository["fetch_logs"]> {
    const response = await this.apiService.post<
      ApiResponses["POST /usage/get_logs"]
    >(`/usage/get_logs`, {
      organization_id: params.organization_id,
      current_page: params.current_page,
      how_many_logs_per_page: params.how_many_logs_per_page,
    });

    if (response.error) {
      return { error: true, code: response.message };
    }

    return {
      error: false,
      body: {
        logs: response.body.logs,
        total_logs: response.body.total_logs,
        total_pages: Math.ceil(
          response.body.total_logs / params.how_many_logs_per_page
        ),
      },
    };
  }

  async reset_api_key(params: {
    organization_id: string;
  }): ReturnType<ApiRepository["reset_api_key"]> {
    const response = await this.apiService.post<
      ApiResponses["POST /api/update_api_key"]
    >(`/api/update_api_key`, {
      organization_id: params.organization_id,
    });

    if (response.error) {
      return { error: true, code: response.message };
    }

    return { error: false, body: { api_key: response.body } };
  }

  async fetch_api_key(params: {
    organization_id: string;
  }): ReturnType<ApiRepository["fetch_api_key"]> {
    const response = await this.apiService.post<
      ApiResponses["POST /api/get_api_key"]
    >(`/api/get_api_key`, {
      organization_id: params.organization_id,
    });

    if (response.error) {
      return { error: true, code: response.message };
    }

    return { error: false, body: { api_key: response.body } };
  }
}
