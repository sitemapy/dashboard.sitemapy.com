import { NavigatorServiceInMemory } from "../navigator.service.in-memory";

describe("NavigatorServiceInMemory", () => {
  let service: NavigatorServiceInMemory;

  beforeEach(() => {
    service = new NavigatorServiceInMemory();
  });

  describe("copy_to_clipboard", () => {
    it("should store text in clipboard", async () => {
      const text = "test text";

      await service.copy_to_clipboard(text);

      expect(service._get_clipboard_content()).toBe(text);
    });
  });
});
