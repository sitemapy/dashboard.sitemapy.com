import { UsageRepository } from "./usage.repository";

export class UsageRepositoryInMemory implements UsageRepository {
  private usage: Map<
    string,
    {
      current_usage: number;
      total_usage_limit: number;
      usage_reset_date: Date;
    }
  > = new Map();

  _store_usage(params: {
    organization_id: string;
    usage: {
      current_usage: number;
      total_usage_limit: number;
      usage_reset_date: Date;
    };
  }) {
    this.usage.set(params.organization_id, params.usage);
  }

  async get_usage(params: {
    organization_id: string;
  }): ReturnType<UsageRepository["get_usage"]> {
    const usage = {
      current_usage: 0,
      total_usage_limit: 100,
      usage_reset_date: new Date(),
    };

    if (!this.usage.has(params.organization_id)) {
      this.usage.set(params.organization_id, usage);
    }

    return {
      error: false,
      body: this.usage.get(params.organization_id) || usage,
    };
  }
}
