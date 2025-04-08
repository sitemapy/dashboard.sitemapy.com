import { SitemapResponse } from "@sitemapy/interfaces";
import { extract_sitemap_data } from "../extract-sitemap-data";

describe("Feature: Extract sitemap data", () => {
  const sitemap_url = "https://example.com/sitemap.xml";
  const sitemap_response: SitemapResponse = {
    url: sitemap_url,
    status_code: 200,
    type: "sitemap-index",
    sitemap_parent_url: null,
    children: [
      {
        url: "https://example.com/sitemap1.xml",
        status_code: 200,
        children: [],
        type: "sitemap",
        sitemap_parent_url: "https://example.com/sitemap.xml",
        number_total_of_pages: 10,
      },
      {
        url: "https://example.com/sitemap2.xml",
        status_code: 200,
        type: "sitemap",
        sitemap_parent_url: "https://example.com/sitemap.xml",
        children: [
          {
            url: "https://example.com/sitemap2-1.xml",
            status_code: 200,
            children: [],
            type: "sitemap",
            sitemap_parent_url: "https://example.com/sitemap2.xml",
            number_total_of_pages: 5,
          },
        ],
        number_total_of_pages: 15,
      },
    ],
    number_total_of_pages: 30,
  };

  it("should extract data from all nodes in the sitemap tree", () => {
    const extracted = extract_sitemap_data(
      sitemap_response,
      (node) => node.url
    );

    expect(extracted).toEqual([
      "https://example.com/sitemap.xml",
      "https://example.com/sitemap1.xml",
      "https://example.com/sitemap2.xml",
      "https://example.com/sitemap2-1.xml",
    ]);
  });

  it("should only extract data when extractor returns non-undefined value", () => {
    const extracted = extract_sitemap_data(sitemap_response, (node) => {
      if (node.type === "sitemap") {
        return node.url;
      }
      return undefined;
    });

    expect(extracted).toEqual([
      "https://example.com/sitemap1.xml",
      "https://example.com/sitemap2.xml",
      "https://example.com/sitemap2-1.xml",
    ]);
  });

  it("should handle empty sitemaps", () => {
    const empty_sitemap: SitemapResponse = {
      url: sitemap_url,
      status_code: 200,
      children: [],
      type: "sitemap",
      sitemap_parent_url: "https://example.com/sitemap.xml",
      number_total_of_pages: 0,
    };

    const extracted = extract_sitemap_data(empty_sitemap, (node) => node.url);

    expect(extracted).toEqual([sitemap_url]);
  });
});
