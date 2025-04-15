import { SitemapResponse } from "@sitemapy/interfaces"
/**
 * Extract data from a sitemap response
 * @param sitemap_response - The sitemap response to extract data from
 * @param extractor - The extractor function that returns the data to extract
 * @returns The extracted data
 * @example
 * const sitemap_response = {
 *   url: "https://example.com/sitemap.xml",
 *   statusCode: 200,
 *   pages: [],
 *   type: "sitemap-index",
 *   sitemaps: [],
 *   numberTotalOfPages: 10,
 * }
 *
 * const extractor = (element: SitemapResponse) => element.url;
 * const extracted = extract_sitemap_data(sitemap_response, extractor);
 * console.log(extracted);
 * // Output: ["https://example.com/sitemap.xml"]
 */
export const extract_sitemap_data = <T>(
  sitemap_response: SitemapResponse,
  extractor: (element: SitemapResponse) => T | undefined
): T[] => {
  const results: T[] = []

  const visit = (node: SitemapResponse) => {
    const extracted = extractor(node)
    if (extracted !== undefined) {
      results.push(extracted)
    }

    if (Array.isArray(node.children)) {
      node.children.forEach(visit)
    }
  }

  visit(sitemap_response)

  return results
}
