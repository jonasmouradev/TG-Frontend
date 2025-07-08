export type SignInOutput = {
  token: string;
};

export type SignUpInput = {
  username: string;
  email: string;
  password: string;
  type: 'PERSON';
  name: string;
};

export type SignInInput = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  email: string;
  username: string;
  name: string;
  type: 'PERSON';
};
