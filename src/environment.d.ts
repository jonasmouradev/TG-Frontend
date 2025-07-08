export {};

declare global {
  interface ImportMetaEnv {
    readonly VITE_APP_API_URL: string;
    readonly VITE_APP_SECRET: string;
    readonly VITE_APP_ENV: string;
  }
}
