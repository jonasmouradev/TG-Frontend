interface ILinks {
  api: string;
}

export const links: ILinks = {
  api: import.meta.env.VITE_APP_API_URL,
};
