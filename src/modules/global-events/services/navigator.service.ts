export interface NavigatorService {
  copy_to_clipboard(text: string): Promise<void>;
}
