import { NavigatorService } from "./navigator.service";

export class NavigatorServiceInMemory implements NavigatorService {
  private clipboard_content: string | null = null;

  async copy_to_clipboard(text: string): Promise<void> {
    this.clipboard_content = text;
  }

  _get_clipboard_content(): string | null {
    return this.clipboard_content;
  }

  get_language(): string {
    return "en";
  }
}
