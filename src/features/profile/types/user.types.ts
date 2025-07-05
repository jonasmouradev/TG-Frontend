export type UserType = {
  id: string;
  email: string;
  username: string;
  password: string;
  status: string;
  type: string;
};

export type UpdateUserInput = {
  username?: string;
  email?: string;
  name?: string;
};
