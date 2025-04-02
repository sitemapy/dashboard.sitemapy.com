import {
  SitemapHistory,
  SitemapResponse,
} from "@/modules/sitemap/entities/sitemap.entity";
import { SitemapRepository } from "@/modules/sitemap/repositories/sitemap.repository";

export class SitemapRepositoryInMemory implements SitemapRepository {
  private sitemap_responses: Map<string, SitemapResponse> = new Map();
  private history: SitemapHistory[] = [];

  async _store_sitemap_response(
    sitemap_url: string,
    sitemap_response: SitemapResponse
  ) {
    this.sitemap_responses.set(sitemap_url, sitemap_response);
    this.history.push({
      sitemap_url,
      created_at: new Date(),
      sitemap_response,
    });
  }

  async fetch_sitemap(
    sitemap_url: string
  ): Promise<RepositoryResponse<SitemapResponse>> {
    const sitemap_response = this.sitemap_responses.get(sitemap_url);

    if (!sitemap_response) {
      return { error: true, code: "SITEMAP_NOT_FOUND" };
    }

    return { error: false, body: sitemap_response };
  }

  async get_history(): Promise<RepositoryResponse<SitemapHistory[]>> {
    return { error: false, body: this.history };
  }
}
