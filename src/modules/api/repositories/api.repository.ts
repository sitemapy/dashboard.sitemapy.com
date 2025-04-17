export type Log = {
  id: string;
  url: string;
  number_of_sitemap_fetched: number;
  total_pages_in_sitemaps: number;
  created_at: Date;
  fetching_duration: number;
  status: "success" | "error";
  error_message: string | null;
};

export type ApiKey = {
  api_key: string;
  current_usage: number;
  max_usage: number;
  reset_date: Date;
};

export interface ApiRepository {
  fetch_api_key(params: { organization_id: string }): Promise<
    RepositoryResponse<{
      api_key: ApiKey;
    }>
  >;
  fetch_logs(params: {
    organization_id: string;
    current_page: number;
    how_many_logs_per_page: number;
  }): Promise<
    RepositoryResponse<{
      logs: Array<Log>;
      total_logs: number;
      total_pages: number;
    }>
  >;

  reset_api_key(params: { organization_id: string }): Promise<
    RepositoryResponse<{
      api_key: ApiKey;
    }>
  >;
}
