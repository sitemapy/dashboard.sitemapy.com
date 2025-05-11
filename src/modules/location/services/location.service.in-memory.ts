import { LocationService } from "./location.service";

type History = {
  url: string;
  pathname: string;
  search: string;
  hash: string;
  state: Record<string, unknown>;
};

export class LocationServiceInMemory implements LocationService {
  private history: History[] = [];
  private origin: string = "http://local.dev";

  getHash() {
    return this.history[this.history.length - 1]?.hash || "";
  }

  getParams<T extends Record<string, string>>() {
    const url = new URL(this.history[this.history.length - 1]?.url || "");
    return Object.fromEntries(url.searchParams.entries()) as T;
  }

  getUrl() {
    return this.history[this.history.length - 1]?.url || "";
  }

  getOrigin() {
    return this.origin;
  }

  navigate(path: string, state: Record<string, unknown> = {}) {
    const url = path.startsWith("http")
      ? new URL(path)
      : new URL(path, this.origin);

    const location = {
      url: url.toString(),
      pathname: url.pathname,
      search: url.search,
      hash: url.hash,
      state,
    };

    this.history.push(location);
  }

  getPathname() {
    return this.history[this.history.length - 1]?.pathname || "/";
  }

  getHistory() {
    return this.history;
  }
}
