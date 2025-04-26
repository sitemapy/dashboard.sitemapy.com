import { actions } from "@/redux/actions";
import { useAppDispatch } from "@/redux/store";
import { SitemapResponse } from "@sitemapy/interfaces";
import React from "react";
import { SitemapResults } from "../sitemap-results";

const meta = {
  title: "modules/sitemap/sitemap-results",
  component: SitemapResults,
  parameters: {},
};

export default meta;

const sitemaps: SitemapResponse[] = [
  {
    url: "https://www.google.com/sitemap.xml",
    status_code: 200,
    number_total_of_pages: 15600,
    updated_at: new Date(),
    sitemap_parent_url: null,
    type: "sitemap-index",
    does_sitemap_contain_errors: false,
    number_total_of_sitemaps: 0,
    fetching_duration: 0,
    children: [
      {
        url: "https://www.google.com/sitemap-1.xml",
        status_code: 200,
        number_total_of_pages: 5000,
        updated_at: new Date(),
        sitemap_parent_url: "https://www.google.com/sitemap.xml",
        type: "sitemap",
        does_sitemap_contain_errors: false,
        number_total_of_sitemaps: 0,
        fetching_duration: 0,
        children: [
          {
            url: "https://www.google.com/topics/",
            status_code: 200,
            number_total_of_pages: 5000,
            updated_at: new Date(),
            sitemap_parent_url: "https://www.google.com/sitemap-1.xml",
            type: "folder",
            does_sitemap_contain_errors: false,
            number_total_of_sitemaps: 0,
            fetching_duration: 0,
            children: [
              {
                url: "https://www.google.com/topics/web-design/",
                status_code: 200,
                number_total_of_pages: 5000,
                updated_at: new Date(),
                sitemap_parent_url: "https://www.google.com/topics/",
                priority: 0.8,
                does_sitemap_contain_errors: false,
                number_total_of_sitemaps: 0,
                fetching_duration: 0,
                children: Array.from({ length: 100 }, (_, i) => ({
                  priority: 0.8,
                  number_total_of_sitemaps: 0,
                  status_code: 200,
                  does_sitemap_contain_errors: false,
                  fetching_duration: 0,
                  url: `https://www.google.com/topics/web-design/web-design-${i}`,
                  updated_at: new Date(),
                  type: "page",
                  sitemap_parent_url:
                    "https://www.google.com/topics/web-design/",
                  number_total_of_pages: 5000,
                  children: [],
                })),
                type: "folder",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const Default = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(
      actions.sitemap._store_sitemap_response({
        sitemap_url: "https://www.google.com/sitemap.xml",
        sitemap_response: sitemaps,
      })
    );
  }, []);

  return <SitemapResults />;
};
