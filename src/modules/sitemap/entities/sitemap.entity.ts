export type SitemapResponsePage = {
  loc: string;
  lastmod: Date | null;
  priority: number | null;
  sitemap_url: string;
};

export type SitemapType = "sitemap" | "sitemap-index";

export type SitemapResponse = {
  url: string;
  statusCode: number;
  pages: Array<SitemapResponsePage>;
  type: SitemapType;
  sitemaps: Array<SitemapResponse>;
  numberTotalOfPages: number;
};

export type SitemapHistory = {
  sitemap_url: string;
  created_at: Date;
  sitemap_response: SitemapResponse;
};
