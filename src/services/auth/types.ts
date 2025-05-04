export type SignInOutput = {
  token: string;
};

export type SignUpInput = {
  username: string;
  email: string;
  password: string;
  type: "PERSON";
  name: string;
};
