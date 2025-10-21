import {
  AuthGateway,
  SignInDto,
  SignUpDto,
  AuthResponse,
  ForgotPasswordDto,
  ResetPasswordDto,
  CheckSecretKeyDto,
} from '@/core/domain/gateways/auth.gateway';
import { IHttpClient, PromiseResponse } from '@/core/domain/ports/http-client.port';

export class AuthHttpGateway implements AuthGateway {
  constructor(private readonly httpClient: IHttpClient) {}

  async signIn(payload: SignInDto): PromiseResponse<AuthResponse> {
    return this.httpClient.post<AuthResponse>({ url: '/auth/signin', payload });
  }

  async signUp(payload: SignUpDto): PromiseResponse<AuthResponse> {
    return this.httpClient.post<AuthResponse>({ url: '/auth/signup', payload });
  }

  async forgotPassword(payload: ForgotPasswordDto): PromiseResponse<{ message: string }> {
    return this.httpClient.patch<{ message: string }>({ url: '/auth/forgot-password', payload });
  }

  async resetPassword(payload: ResetPasswordDto): PromiseResponse<{ message: string }> {
    return this.httpClient.patch<{ message: string }>({ url: '/auth/reset-password', payload });
  }

  async checkSecretKey(payload: CheckSecretKeyDto): PromiseResponse<{ isValid: boolean }> {
    return this.httpClient.patch<{ isValid: boolean }>({ url: '/auth/password', payload });
  }

  async logout(): PromiseResponse<void> {
    return this.httpClient.post({ url: '/auth/logout' });
  }

  async refreshToken(): PromiseResponse<AuthResponse> {
    return this.httpClient.post<AuthResponse>({ url: '/auth/refresh' });
  }
}
