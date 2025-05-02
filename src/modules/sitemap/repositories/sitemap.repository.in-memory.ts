import { SitemapRepository } from "@/modules/sitemap/repositories/sitemap.repository";
import { SitemapResponse } from "@sitemapy/interfaces";

export class SitemapRepositoryInMemory implements SitemapRepository {
  private sitemap_responses: Map<string, SitemapResponse[]> = new Map();
  private history: { sitemap_url: string; created_at: Date }[] = [];

  constructor(params?: {
    sitemap_responses?: Map<string, SitemapResponse[]>;
    history?: { sitemap_url: string; created_at: Date }[];
  }) {
    this.sitemap_responses = params?.sitemap_responses || new Map();
    this.history = params?.history || [];
  }

  async _store_sitemap_response(
    sitemap_url: string,
    sitemap_response: SitemapResponse[]
  ) {
    this.sitemap_responses.set(sitemap_url, sitemap_response);
  }

  async _store_history(sitemap_url: string) {
    this.history.push({ sitemap_url, created_at: new Date() });
  }

  async fetch_sitemap(params: {
    sitemap_url: string;
    organization_id: string;
  }): Promise<RepositoryResponse<SitemapResponse[]>> {
    const sitemap_response = this.sitemap_responses.get(params.sitemap_url);

    if (!sitemap_response) {
      return { error: true, code: "SITEMAP_NOT_FOUND" };
    }

    this.history = [
      ...this.history,
      { sitemap_url: params.sitemap_url, created_at: new Date() },
    ];

    return { error: false, body: sitemap_response };
  }

  async fetch_history(): Promise<
    RepositoryResponse<{ sitemap_url: string; created_at: Date }[]>
  > {
    return { error: false, body: this.history };
  }
}
