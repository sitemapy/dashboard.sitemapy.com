import { ApiKey, ApiRepository, Log } from "./api.repository";

export class ApiRepositoryInMemory implements ApiRepository {
  private keys: Map<string, ApiKey> = new Map();
  private logs: Map<string, Array<Log>> = new Map();

  _store_logs(params: { organization_id: string; logs: Array<Log> }) {
    this.logs.set(params.organization_id, params.logs);
  }

  _store_api_key(params: { organization_id: string; api_key: ApiKey }) {
    this.keys.set(params.organization_id, params.api_key);
  }

  async fetch_api_key(params: {
    organization_id: string;
  }): Promise<RepositoryResponse<{ api_key: ApiKey }>> {
    if (!this.keys.has(params.organization_id)) {
      this.keys.set(params.organization_id, {
        api_key: "fake_api_key",
        current_usage: 0,
        max_usage: 1000,
        reset_date: new Date(),
      });
    }

    return {
      error: false,
      body: {
        api_key: this.keys.get(params.organization_id) as ApiKey,
      },
    };
  }

  async fetch_logs(params: {
    organization_id: string;
    current_page: number;
    how_many_logs_per_page: number;
  }): Promise<
    RepositoryResponse<{
      logs: Array<Log>;
      total_logs: number;
      total_pages: number;
    }>
  > {
    const logs = this.logs.get(params.organization_id) || [];
    const total_logs = logs.length;
    const total_pages = Math.ceil(total_logs / params.how_many_logs_per_page);

    return {
      error: false,
      body: {
        logs: logs.slice(
          (params.current_page - 1) * params.how_many_logs_per_page,
          params.current_page * params.how_many_logs_per_page
        ),
        total_logs,
        total_pages,
      },
    };
  }
}
