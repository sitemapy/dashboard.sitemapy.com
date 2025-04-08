import type { Meta } from "@storybook/react";
import { SitemapResults } from "../sitemap-results";
import { SitemapResponse } from "@sitemapy/interfaces";

const meta = {
  title: "Organisms/SitemapResults",
  component: SitemapResults,
  parameters: {},
} satisfies Meta<typeof SitemapResults>;

export default meta;

const sitemaps: SitemapResponse[] = [
  {
    url: "https://www.google.com/sitemap.xml",
    status_code: 200,
    number_total_of_pages: 15600,
    updated_at: new Date(),
    sitemap_parent_url: null,
    type: "sitemap-index",
    children: [
      {
        url: "https://www.google.com/sitemap-1.xml",
        status_code: 200,
        number_total_of_pages: 5000,
        updated_at: new Date(),
        sitemap_parent_url: "https://www.google.com/sitemap.xml",
        type: "sitemap",
        children: [
          {
            url: "https://www.google.com/topics/",
            status_code: 200,
            number_total_of_pages: 5000,
            updated_at: new Date(),
            sitemap_parent_url: "https://www.google.com/sitemap-1.xml",
            type: "folder",
            children: [
              {
                url: "https://www.google.com/topics/web-design/",
                status_code: 200,
                number_total_of_pages: 5000,
                updated_at: new Date(),
                sitemap_parent_url: "https://www.google.com/topics/",
                priority: 0.8,
                children: Array.from({ length: 100 }, (_, i) => ({
                  priority: 0.8,
                  status_code: 200,
                  url: `https://www.google.com/topics/web-design/web-design-${i}`,
                  updated_at: new Date(),
                  type: "page",
                  sitemap_parent_url: "https://www.google.com/topics/web-design/",
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

export const Default = {
  render: () => {
    return (
      <SitemapResults 
        isLoading={false}
        sitemaps={sitemaps}
      />
    );
  }
};
