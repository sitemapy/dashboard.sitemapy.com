export const format_url_for_sitemap = (url: string) => {
  return url.replace(/^https?:\/\//, "").replace(/^[^/]+/, "");
};
