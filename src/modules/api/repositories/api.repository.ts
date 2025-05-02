import { ApiKeyEntity, SitemapLogEntity } from "@sitemapy/interfaces";

export interface ApiRepository {
  fetch_api_key(params: { organization_id: string }): Promise<
    RepositoryResponse<{
      api_key: ApiKeyEntity;
    }>
  >;
  fetch_logs(params: {
    organization_id: string;
    current_page: number;
    how_many_logs_per_page: number;
  }): Promise<
    RepositoryResponse<{
      logs: Array<SitemapLogEntity>;
      total_logs: number;
      total_pages: number;
    }>
  >;

  reset_api_key(params: { organization_id: string }): Promise<
    RepositoryResponse<{
      api_key: ApiKeyEntity;
    }>
  >;
}
