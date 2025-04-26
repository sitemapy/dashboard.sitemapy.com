import { SitemapResponse } from "@sitemapy/interfaces";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

const generate_response = () => {
  const response: SitemapResponse = {
    url: "https://www.sudoku.academy/sitemap-index.xml",
    type: "sitemap-index",
    sitemap_parent_url: "https://www.sudoku.academy",
    number_total_of_pages: 100,
    priority: 1,
    status_code: 200,
    updated_at: new Date("2021-01-01T00:00:00.000Z"),
    children: [
      {
        url: "https://www.sudoku.academy/sitemap-1.xml",
        type: "sitemap",
        sitemap_parent_url: "https://www.sudoku.academy/sitemap-index.xml",
        number_total_of_pages: 1,
        status_code: 200,
        updated_at: new Date("2021-01-01T00:00:00.000Z"),
        priority: 1,
        children: [
          {
            url: "https://www.sudoku.academy/sudoku-1",
            type: "page",
            sitemap_parent_url: "https://www.sudoku.academy/sitemap-1.xml",
            number_total_of_pages: 1,
            children: [],
            number_total_of_sitemaps: 0,
            fetching_duration: 0,
            does_sitemap_contain_errors: false,
          },
        ],
        number_total_of_sitemaps: 0,
        fetching_duration: 0,
        does_sitemap_contain_errors: false,
      },
    ],
    number_total_of_sitemaps: 0,
    fetching_duration: 0,
    does_sitemap_contain_errors: false,
  };

  return JSON.stringify(response, null, 2);
};

const get_html = async (code: string) => {
  const html = await codeToHtml(code, {
    lang: "json",
    theme: "github-light",
  });

  return html;
};

export const ApiKeyHowToUseResponse: React.FC = () => {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    get_html(generate_response()).then(setHtml);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-auto rounded-md border border-slate-200 p-4 text-slate-900">
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: html as string }}
        />
      </div>
    </div>
  );
};
