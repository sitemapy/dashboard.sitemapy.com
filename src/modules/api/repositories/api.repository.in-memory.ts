import { ApiKeyEntity, SitemapLogEntity } from "@sitemapy/interfaces";
import { ApiRepository } from "./api.repository";

export class ApiRepositoryInMemory implements ApiRepository {
  private keys: Map<string, ApiKeyEntity> = new Map();
  private logs: Map<string, Array<SitemapLogEntity>> = new Map();

  _store_logs(params: {
    organization_id: string;
    logs: Array<SitemapLogEntity>;
  }) {
    this.logs.set(params.organization_id, params.logs);
  }

  _store_api_key(params: { organization_id: string; api_key: ApiKeyEntity }) {
    this.keys.set(params.organization_id, params.api_key);
  }

  async fetch_api_key(params: {
    organization_id: string;
  }): ReturnType<ApiRepository["fetch_api_key"]> {
    if (!this.keys.has(params.organization_id)) {
      this.keys.set(params.organization_id, {
        key: "fake_api_key",
        organization_id: params.organization_id,
        updated_at: new Date(),
        created_at: new Date(),
      });
    }

    return {
      error: false,
      body: {
        api_key: this.keys.get(params.organization_id) as ApiKeyEntity,
      },
    };
  }

  async fetch_logs(params: {
    organization_id: string;
    current_page: number;
    how_many_logs_per_page: number;
  }): ReturnType<ApiRepository["fetch_logs"]> {
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

  async reset_api_key(params: {
    organization_id: string;
  }): ReturnType<ApiRepository["reset_api_key"]> {
    this.keys.set(params.organization_id, {
      key: "reseted_fake_api_key",
      organization_id: params.organization_id,
      updated_at: new Date(),
      created_at: new Date(),
    });

    return this.fetch_api_key(params);
  }
}
