import { ApiService } from "@/modules/api/services/api.service";
import { UsageRepository } from "./usage.repository";

export class UsageRepositoryApi implements UsageRepository {
  constructor(private apiService: ApiService) {}

  async get_usage(params: { organization_id: string }): Promise<
    RepositoryResponse<{
      current_usage: number;
      total_usage_limit: number;
      usage_reset_date: Date;
    }>
  > {
    const response = await this.apiService.post(`/usage/get_current_usage`, {
      organization_id: params.organization_id,
    });

    if (response.error) {
      return {
        error: true,
        code: response.message,
      };
    }

    const body = response.body as {
      current_usage: number;
      max_usage: number;
      reset_date: Date;
    };

    return {
      error: false,
      body: {
        current_usage: body.current_usage,
        total_usage_limit: body.max_usage,
        usage_reset_date: new Date(body.reset_date),
      },
    };
  }
}
