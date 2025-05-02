import { ApiService } from "@/modules/api/services/api.service";
import { SitemapRepository } from "@/modules/sitemap/repositories/sitemap.repository";
import { ApiResponses, SitemapResponse } from "@sitemapy/interfaces";
import { uniqBy } from "lodash";

export class SitemapRepositoryApi implements SitemapRepository {
  private readonly LOCAL_STORAGE_KEY_HISTORY = "sitemap-history";

  constructor(private apiService: ApiService) {}

  async fetch_sitemap(params: {
    sitemap_url: string;
    organization_id: string;
  }): Promise<RepositoryResponse<SitemapResponse[]>> {
    const response = await this.apiService.post<
      ApiResponses["POST /sitemap/crawl/with-tree"]
    >(`/sitemap/crawl/with-tree`, {
      url: params.sitemap_url,
      organization_id: params.organization_id,
      include_pages: true,
    });

    if (response.error) {
      return {
        error: true,
        code: response.message,
      };
    }

    this._store_history([
      {
        sitemap_url: params.sitemap_url,
        created_at: new Date(),
      },
    ]);

    return { error: false, body: [response.body] };
  }

  private _get_history(): { sitemap_url: string; created_at: Date }[] {
    try {
      const history = localStorage.getItem(this.LOCAL_STORAGE_KEY_HISTORY);

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
        this.LOCAL_STORAGE_KEY_HISTORY,
        JSON.stringify(
          uniqBy(
            [...history, ...history_in_local_storage],
            "sitemap_url"
          ).slice(0, 10)
        )
      );
    } catch {
      return;
    }
  }

  async fetch_history(): Promise<
    RepositoryResponse<{ sitemap_url: string; created_at: Date }[]>
  > {
    const history = this._get_history();

    return { error: false, body: history };
  }
}
