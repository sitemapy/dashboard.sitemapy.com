export interface UsageRepository {
  get_usage(params: { organization_id: string }): Promise<
    RepositoryResponse<{
      current_usage: number;
      total_usage_limit: number;
      usage_reset_date: Date;
    }>
  >;
}
