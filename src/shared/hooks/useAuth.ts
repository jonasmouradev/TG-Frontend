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

export function useAuthCases() {
  const { authGateway, cookieStorage, crypto } = useCase();

  return {
    signIn: new SignInUseCase(crypto, cookieStorage).execute,
    signUp: new SignUpUseCase(authGateway).execute,
    signOut: new SignOutUseCase(cookieStorage).execute,
    decodeToken: new DecodeTokenUseCase().execute,
    validateToken: new ValidateTokenUseCase().execute,
    refreshToken: new RefreshTokenUseCase(authGateway).execute,
    forgotPassword: new ForgotPasswordUseCase(authGateway).execute,
    resetPassword: new ResetPasswordUseCase(authGateway).execute,
    authenticateUser: new AuthenticateUserUseCase(authGateway).execute,
    setToken: new SetAuthTokenUseCase(crypto, cookieStorage).execute,
    getToken: new GetAuthTokenUseCase(crypto, cookieStorage).execute,
  };
}
