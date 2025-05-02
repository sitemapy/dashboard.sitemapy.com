import { ApiKeyEntity, SitemapLogEntity } from "@sitemapy/interfaces";
import { ApiRepositoryInMemory } from "../api.repository.in-memory";

describe("Feature:ApiRepositoryInMemory", () => {
  let repository: ApiRepositoryInMemory;

  beforeEach(() => {
    repository = new ApiRepositoryInMemory();
  });

  describe("Scenario: fetch_api_key", () => {
    it("should return default api key if none exists", async () => {
      const result = await repository.fetch_api_key({
        organization_id: "org_1",
      });

      if (result.error) {
        throw new Error("Error fetching api key");
      }

      expect(result.body.api_key).toEqual({
        key: "fake_api_key",
        organization_id: "org_1",
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      });
    });

    it("should return stored api key", async () => {
      const storedKey: ApiKeyEntity = {
        key: "test_key",
        organization_id: "org_1",
        created_at: new Date(),
        updated_at: new Date(),
      };

      repository._store_api_key({
        organization_id: "org_1",
        api_key: {
          key: "test_key",
          organization_id: "org_1",
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      const result = await repository.fetch_api_key({
        organization_id: "org_1",
      });

      if (result.error) {
        throw new Error("Error fetching api key");
      }

      expect(result.body.api_key).toEqual(storedKey);
    });
  });

  describe("Scenario: fetch_logs", () => {
    it("should return empty logs if none exist", async () => {
      const result = await repository.fetch_logs({
        organization_id: "org_1",
        current_page: 1,
        how_many_logs_per_page: 10,
      });

      if (result.error) {
        throw new Error("Error fetching logs");
      }

      expect(result.body).toEqual({
        logs: [],
        total_logs: 0,
        total_pages: 0,
      });
    });

    it("should return paginated logs", async () => {
      const logs: SitemapLogEntity[] = Array.from({ length: 25 }, (_, i) => ({
        id: `log_${i}`,
        url: `https://example.com/${i}`,
        number_of_sitemap_fetched: i,
        total_pages_in_sitemaps: i * 100,
        created_at: new Date(),
        fetching_duration: i,
        status: "success",
        error_message: null,
        api_key_id: "api_key_id",
        organization_id: "organization_id",
        does_sitemap_contain_errors: false,
        mode: "pages_only",
        source: "api",
      }));

      repository._store_logs({
        organization_id: "org_1",
        logs,
      });

      const result = await repository.fetch_logs({
        organization_id: "org_1",
        current_page: 2,
        how_many_logs_per_page: 10,
      });

      if (result.error) {
        throw new Error("Error fetching logs");
      }

      expect(result.body.logs).toHaveLength(10);
      expect(result.body.total_logs).toBe(25);
      expect(result.body.total_pages).toBe(3);
      expect(result.body.logs[0].id).toBe("log_10");
      expect(result.body.logs[9].id).toBe("log_19");
    });
  });
});
