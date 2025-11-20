export type UserType = {
  id: string;
  email: string;
  username: string;
  name: string;
  type: string;
};

export type UpdateUserInput = {
  username?: string;
  email?: string;
  name?: string;
};
