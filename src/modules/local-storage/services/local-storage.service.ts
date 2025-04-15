export enum LOCAL_STORAGE_KEYS {
  TOKEN_KEY = "token",
}

export class LocalStorageService {
  constructor(private localStorage: Storage) {}

  get(key: LOCAL_STORAGE_KEYS) {
    try {
      return this.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  set(key: LOCAL_STORAGE_KEYS, value: string) {
    try {
      this.localStorage.setItem(key, value);
    } catch {
      return null;
    }
  }
}
