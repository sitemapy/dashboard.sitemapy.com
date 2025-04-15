import { ApiService } from "@/modules/api/services/api.service";
import { SitemapRepository } from "@/modules/sitemap/repositories/sitemap.repository";
import { SitemapResponse } from "@sitemapy/interfaces";
import { uniqBy } from "lodash";

export class SitemapRepositoryApi implements SitemapRepository {
  constructor(private apiService: ApiService) {}

  async fetch_sitemap(
    sitemap_url: string
  ): Promise<RepositoryResponse<SitemapResponse[]>> {
    const response = await this.apiService.post<SitemapResponse>(
      `/sitemap/free-tool/run`,
      {
        url: sitemap_url,
      }
    );

    if (response.error) {
      return {
        error: true,
        code: response.message,
      };
    }

    this._store_history([
      {
        sitemap_url: sitemap_url,
        created_at: new Date(),
      },
    ]);

    return { error: false, body: [response.body] };
  }

  private _get_history(): { sitemap_url: string; created_at: Date }[] {
    try {
      const history = localStorage.getItem("sitemap_history");

      if (!history) return [];

      return JSON.parse(history);
    } catch {
      return [];
    }
  }

  private _store_history(history: { sitemap_url: string; created_at: Date }[]) {
    try {
      const history_in_local_storage = this._get_history();

      localStorage.setItem(
        "sitemap_history",
        JSON.stringify(
          uniqBy(
            [...history, ...history_in_local_storage],
            "sitemap_url"
          ).slice(0, 10)
        )
      );
    } catch {
      // Do nothing
    }
  }

  async fetch_history(): Promise<
    RepositoryResponse<{ sitemap_url: string; created_at: Date }[]>
  > {
    const history = this._get_history();

    return { error: false, body: history };
  }
}
