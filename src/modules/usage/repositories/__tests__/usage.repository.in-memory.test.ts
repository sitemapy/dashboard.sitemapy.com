import { UsageRepositoryInMemory } from "../usage.repository.in-memory";

describe("Feature:UsageRepositoryInMemory", () => {
  let repository: UsageRepositoryInMemory;

  beforeEach(() => {
    repository = new UsageRepositoryInMemory();
  });

  describe("Scenario: get_usage", () => {
    it("should return default usage if none exists", async () => {
      const result = await repository.get_usage({
        organization_id: "org_1",
      });

      if (result.error) {
        throw new Error("Error fetching usage");
      }

      expect(result.body).toEqual({
        current_usage: 0,
        total_usage_limit: 100,
        usage_reset_date: expect.any(Date),
      });
    });

    it("should return stored usage", async () => {
      const storedUsage = {
        current_usage: 50,
        total_usage_limit: 500,
        usage_reset_date: new Date(),
      };

      repository._store_usage({
        organization_id: "org_1",
        usage: storedUsage,
      });

      const result = await repository.get_usage({
        organization_id: "org_1",
      });

      if (result.error) {
        throw new Error("Error fetching usage");
      }

      expect(result.body).toEqual(storedUsage);
    });
  });
});
