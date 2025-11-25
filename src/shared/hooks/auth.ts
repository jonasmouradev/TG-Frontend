import { useCase } from '@shared/contexts/UseCaseContext';
import {
  SignInUseCase,
  SignUpUseCase,
  DecodeTokenUseCase,
  ValidateTokenUseCase,
  RefreshTokenUseCase,
  ResetPasswordUseCase,
  ForgotPasswordUseCase,
  AuthenticateUserUseCase,
  GetAuthTokenUseCase,
  GetDecodedTokenUseCase,
} from '@core/application/use-cases';
import type {
  SignInUseCaseInput,
  SignUpUseCaseInput,
  ForgotPasswordUseCaseInput,
  ResetPasswordUseCaseInput,
  AuthenticateUserUseCaseInput,
} from '@core/application/use-cases';
import { useMemo } from 'react';
import { SetAuthTokenUseCase } from '@core/application/use-cases/token/set-auth-token.use-case';
import { SignOutUseCase } from '@core/application/use-cases/auth/sign-out.use-case';
import { IToken } from '@shared/types';

export function useAuthCases() {
  const { authGateway, cookieStorage, crypto } = useCase();

  return useMemo(
    () => ({
      signIn: (input: SignInUseCaseInput) => new SignInUseCase(crypto, cookieStorage).execute(input),
      signUp: (input: SignUpUseCaseInput) => new SignUpUseCase(authGateway).execute(input),
      signOut: () => new SignOutUseCase(cookieStorage).execute(),
      decodeToken: (input: string) => new DecodeTokenUseCase().execute<IToken>(input),
      validateToken: (input: string) => new ValidateTokenUseCase().execute(input),
      refreshToken: () => new RefreshTokenUseCase(authGateway).execute(),
      forgotPassword: (input: ForgotPasswordUseCaseInput) => new ForgotPasswordUseCase(authGateway).execute(input),
      resetPassword: (input: ResetPasswordUseCaseInput) => new ResetPasswordUseCase(authGateway).execute(input),
      authenticateUser: (input: AuthenticateUserUseCaseInput) =>
        new AuthenticateUserUseCase(authGateway).execute(input),
      setToken: (input: string) => new SetAuthTokenUseCase(crypto, cookieStorage).execute(input),
      getToken: () => new GetAuthTokenUseCase(crypto, cookieStorage).execute(),
      getDecodedToken: () => new GetDecodedTokenUseCase(crypto, cookieStorage).execute(),
    }),
    [authGateway, cookieStorage, crypto],
  );
}
