type RepositoryResponse<T> =
  | {
      error: true;
      code: MessageI18nKeys;
    }
  | {
      error: false;
      body: T;
    };
