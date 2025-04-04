import { navigate } from "@reach/router";
import { LocationService } from "./location.service";

type History = {
  url: string;
  pathname: string;
  search: string;
  hash: string;
  state: Record<string, unknown>;
};

export class LocationServiceWindow implements LocationService {
  private history: History[] = [];

  navigate(path: string, state: Record<string, unknown> = {}) {
    const url = path.startsWith("http")
      ? new URL(path)
      : new URL(path, "http://local.dev");

    const location = {
      url: url.toString(),
      pathname: url.pathname,
      search: url.search,
      hash: url.hash,
      state,
    };

    this.history.push(location);

    navigate(path, { state });
  }

  getPathname() {
    return window.location.pathname;
  }

  getHistory() {
    return this.history;
  }
}
