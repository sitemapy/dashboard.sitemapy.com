type History = {
  url: string;
  pathname: string;
  search: string;
  hash: string;
  state: Record<string, unknown>;
};

export interface LocationService {
  navigate: (path: string, state?: Record<string, unknown>) => void;
  getPathname: () => string;
  getHistory: () => History[];
}
