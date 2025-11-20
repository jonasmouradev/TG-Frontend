interface ILinks {
  api: string;
  web: string;
  secret: string;
  production: boolean;
}

export const links: ILinks = {
  web: import.meta.env.BASE_URL,
  api: import.meta.env.VITE_API_URL,
  secret: import.meta.env.VITE_SECRET,
  production: import.meta.env.VITE_ENV === 'production',
} as const;
