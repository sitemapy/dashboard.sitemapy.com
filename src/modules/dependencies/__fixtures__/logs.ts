import { Log } from "@/modules/api/repositories/api.repository";

export const logs: Log[] = Array.from({ length: 2000 }, (_, index) => ({
  id: `log_${index + 1}`,
  url: `https://www.sudoku.academy/page-${index + 1}`,
  status: index % 5 === 0 ? "error" : "success",
  created_at: new Date(),
  updated_at: new Date(),
  error_message: index % 5 === 0 ? "Error message" : null,
  fetching_duration: 1000,
  number_of_sitemap_fetched: 3,
  total_pages_in_sitemaps: 56340,
}));
