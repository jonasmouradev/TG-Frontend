interface ILinks {
  api: string;
  web: string;
  secret: string;
  production: boolean;
}

export const links: ILinks = {
  api: import.meta.env.VITE_APP_API_URL,
  web: import.meta.env.BASE_URL,
  secret: import.meta.env.VITE_SECRET,
  production: import.meta.env.VITE_APP_ENV === 'production',
};
