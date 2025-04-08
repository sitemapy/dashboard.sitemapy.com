import { SitemapResponse } from "@sitemapy/interfaces";

export interface SitemapRepository {
  fetch_sitemap(
    sitemap_url: string
  ): Promise<RepositoryResponse<SitemapResponse[]>>;

  _store_sitemap_response(
    sitemap_url: string,
    sitemap_response: SitemapResponse[]
  ): Promise<void>;
}
