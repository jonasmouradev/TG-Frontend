import { useCase } from '@shared/contexts/UseCaseContext';
import {
  SignInUseCase,
  SignUpUseCase,
  SignOutUseCase,
  DecodeTokenUseCase,
  ValidateTokenUseCase,
  RefreshTokenUseCase,
  ResetPasswordUseCase,
  ForgotPasswordUseCase,
  AuthenticateUserUseCase,
  SetAuthTokenUseCase,
  GetAuthTokenUseCase,
} from '@core/application/use-cases';
import type {
  SignInUseCaseInput,
  SignUpUseCaseInput,
  ForgotPasswordUseCaseInput,
  ResetPasswordUseCaseInput,
  AuthenticateUserUseCaseInput,
} from '@core/application/use-cases';
import { useMemo } from 'react';

export function useAuthCases() {
  const { authGateway, cookieStorage, crypto } = useCase();

  return useMemo(
    () => ({
      signIn: (input: SignInUseCaseInput) => new SignInUseCase(crypto, cookieStorage).execute(input),
      signUp: (input: SignUpUseCaseInput) => new SignUpUseCase(authGateway).execute(input),
      signOut: () => new SignOutUseCase(cookieStorage).execute(),
      decodeToken: (input: string) => new DecodeTokenUseCase().execute(input),
      validateToken: (input: string) => new ValidateTokenUseCase().execute(input),
      refreshToken: () => new RefreshTokenUseCase(authGateway).execute(),
      forgotPassword: (input: ForgotPasswordUseCaseInput) => new ForgotPasswordUseCase(authGateway).execute(input),
      resetPassword: (input: ResetPasswordUseCaseInput) => new ResetPasswordUseCase(authGateway).execute(input),
      authenticateUser: (input: AuthenticateUserUseCaseInput) =>
        new AuthenticateUserUseCase(authGateway).execute(input),
      setToken: (input: string) => new SetAuthTokenUseCase(crypto, cookieStorage).execute(input),
      getToken: () => new GetAuthTokenUseCase(crypto, cookieStorage).execute(),
    }),
    [authGateway, cookieStorage, crypto],
  );
}
