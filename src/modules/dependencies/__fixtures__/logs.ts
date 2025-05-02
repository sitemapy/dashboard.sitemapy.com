import { SitemapLogEntity } from "@sitemapy/interfaces";

export const logs: SitemapLogEntity[] = Array.from(
  { length: 2000 },
  (_, index) => ({
    id: `log_${index + 1}`,
    api_key_id: "api_key_id",
    organization_id: "organization_id",
    url: `https://www.sudoku.academy/page-${index + 1}`,
    status: index % 5 === 0 ? "error" : "success",
    created_at: new Date(),
    updated_at: new Date(),
    error_message: index % 5 === 0 ? "Error message" : null,
    fetching_duration: 1000,
    number_of_sitemap_fetched: 3,
    total_pages_in_sitemaps: 56340,
    source: index % 2 === 0 ? "api" : "web",
    does_sitemap_contain_errors: index % 5 === 0,
    mode: "pages_only",
  })
);
