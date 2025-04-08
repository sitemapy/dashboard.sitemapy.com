import { SitemapResponse } from "../../entities/sitemap.entity";
import { extract_sitemap_data } from "../extract-sitemap-data";

describe("Feature: Extract sitemap data", () => {
  const sitemap_url = "https://example.com/sitemap.xml";
  const sitemap_response: SitemapResponse = {
    url: sitemap_url,
    statusCode: 200,
    pages: [],
    type: "sitemap-index",
    sitemaps: [
      {
        url: "https://example.com/sitemap1.xml",
        statusCode: 200,
        pages: [],
        type: "sitemap",
        sitemaps: [],
        numberTotalOfPages: 10,
      },
      {
        url: "https://example.com/sitemap2.xml",
        statusCode: 200,
        pages: [],
        type: "sitemap",
        sitemaps: [
          {
            url: "https://example.com/sitemap2-1.xml",
            statusCode: 200,
            pages: [],
            type: "sitemap",
            sitemaps: [],
            numberTotalOfPages: 5,
          },
        ],
        numberTotalOfPages: 15,
      },
    ],
    numberTotalOfPages: 30,
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
      statusCode: 200,
      pages: [],
      type: "sitemap",
      sitemaps: [],
      numberTotalOfPages: 0,
    };

    const extracted = extract_sitemap_data(empty_sitemap, (node) => node.url);

    expect(extracted).toEqual([sitemap_url]);
  });
});
