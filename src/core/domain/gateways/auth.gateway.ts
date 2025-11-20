import { IUser } from '@shared/types';
import { PromiseResponse } from '../ports/http-client.port';

type SignInDto = {
  email: string;
  password: string;
};

type SignUpDto = {
  username: string;
  name: string;
  email: string;
  password: string;
  cpf?: string;
  cnpj?: string;
  type: string;
  phone: string;
};

type AuthResponse = {
  accessToken: string;
  user: IUser;
  expiresIn: string;
};

type ForgotPasswordDto = {
  email: string;
};

type ResetPasswordDto = {
  secretKey: string;
  newPassword: string;
};

type CheckSecretKeyDto = {
  secretKey: string;
};

export interface AuthGateway {
  signIn(payload: SignInDto): PromiseResponse<AuthResponse | null>;
  signUp(payload: SignUpDto): PromiseResponse<AuthResponse | null>;
  forgotPassword(payload: ForgotPasswordDto): PromiseResponse<{ message: string } | null>;
  resetPassword(payload: ResetPasswordDto): PromiseResponse<{ message: string } | null>;
  checkSecretKey(payload: CheckSecretKeyDto): PromiseResponse<{ isValid: boolean } | null>;
  logout(): PromiseResponse<void | null>;
  refreshToken(): PromiseResponse<AuthResponse | null>;
}

export type { SignInDto, SignUpDto, AuthResponse, ForgotPasswordDto, ResetPasswordDto, CheckSecretKeyDto };
