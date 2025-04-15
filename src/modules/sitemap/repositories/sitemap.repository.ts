import { SitemapResponse } from "@sitemapy/interfaces"

export interface SitemapRepository {
  fetch_sitemap(
    sitemap_url: string,
  ): Promise<RepositoryResponse<SitemapResponse[]>>

  fetch_history(): Promise<
    RepositoryResponse<{ sitemap_url: string; created_at: Date }[]>
  >
}
