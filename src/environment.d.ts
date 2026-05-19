export {};

declare global {
  interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_SECRET: string;
    readonly VITE_ENV: string;
  }
}
