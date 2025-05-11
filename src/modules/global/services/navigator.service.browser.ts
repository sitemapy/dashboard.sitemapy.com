import { NavigatorService } from "./navigator.service";

export class NavigatorServiceBrowser implements NavigatorService {
  async copy_to_clipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
  }

  get_language(): string {
    return navigator.language;
  }
}
