export enum LOCAL_STORAGE_KEYS {
  TOKEN_KEY = "bearer-token",
  ORGANIZATION_ID_KEY = "organization_id",
  LANGUAGE_KEY = "language",
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
