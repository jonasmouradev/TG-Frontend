export interface ICookieStorage {
  clear(): void;
  get(key: string): string | null;
  getAllData(): Record<string, string>;
  remove(key: string, options?: { domain?: string }): void;
  set(key: string, value: string, options?: { expires?: number; domain?: string }): void;
}
