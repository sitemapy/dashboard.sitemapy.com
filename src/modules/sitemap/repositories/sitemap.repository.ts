import {
  SitemapHistory,
  SitemapResponse,
} from "@/modules/sitemap/entities/sitemap.entity";

export interface SitemapRepository {
  fetch_sitemap(
    sitemap_url: string
  ): Promise<RepositoryResponse<SitemapResponse>>;

  get_history(): Promise<RepositoryResponse<SitemapHistory[]>>;

  _store_sitemap_response(
    sitemap_url: string,
    sitemap_response: SitemapResponse
  ): Promise<void>;
}
