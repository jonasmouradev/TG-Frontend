interface ILinks {
  api: string;
  secret: string;
  production: boolean;
}

export const links: ILinks = {
  api: import.meta.env.VITE_APP_API_URL,
  secret: import.meta.env.VITE_APP_SECRET,
  production: import.meta.env.VITE_APP_ENV === 'production',
};
