import { User } from "./user";

export interface Token {
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  nbf: number;
  prv: string;
  sub: string;
  user: User;
}
