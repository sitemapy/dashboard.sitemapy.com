type RepositoryResponse<T> =
  | {
      error: true;
      code: string;
    }
  | {
      error: false;
      body: T;
    };
