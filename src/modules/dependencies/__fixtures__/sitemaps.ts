import { SitemapResponse } from "@sitemapy/interfaces";

export const sitemap: SitemapResponse = {
  url: "https://www.sudoku.academy/sitemap-index.xml",
  type: "sitemap-index",
  sitemap_parent_url: null,
  number_total_of_pages: 35,
  status_code: 200,
  updated_at: new Date(),
  children: [
    {
      url: "https://www.sudoku.academy/sitemap-1.xml",
      type: "sitemap",
      sitemap_parent_url: "https://www.sudoku.academy/sitemap-index.xml",
      number_total_of_pages: 35,
      status_code: 200,
      updated_at: new Date(),
      children: [
        {
          url: "https://www.sudoku.academy/articles",
          type: "folder",
          sitemap_parent_url: "https://www.sudoku.academy/sitemap-1.xml",
          number_total_of_pages: 15,
          status_code: 200,
          updated_at: new Date(),
          children: Array.from({ length: 15 }, (_, index) => ({
            url: `https://www.sudoku.academy/articles/${index + 1}`,
            type: "page",
            sitemap_parent_url: "https://www.sudoku.academy/articles",
            number_total_of_pages: 0,
            status_code: 200,
            updated_at: new Date(),
            children: [],
          })),
        },
        {
          url: "https://www.sudoku.academy/topics",
          type: "folder",
          sitemap_parent_url: "https://www.sudoku.academy/sitemap-1.xml",
          number_total_of_pages: 20,
          children: Array.from({ length: 20 }, (_, index) => ({
            url: `https://www.sudoku.academy/topics/${index + 1}`,
            type: "page",
            sitemap_parent_url: "https://www.sudoku.academy/topics",
            number_total_of_pages: 0,
            status_code: 200,
            updated_at: new Date(),
            children: [],
          })),
        },
      ],
    },
  ],
};
