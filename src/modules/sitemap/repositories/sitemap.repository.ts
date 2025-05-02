import { SitemapResponse } from "@sitemapy/interfaces";

export interface SitemapRepository {
  fetch_sitemap(params: {
    sitemap_url: string;
    organization_id: string;
  }): Promise<RepositoryResponse<SitemapResponse[]>>;

  fetch_history(
    organization_id: string
  ): Promise<RepositoryResponse<{ sitemap_url: string; created_at: Date }[]>>;
}
