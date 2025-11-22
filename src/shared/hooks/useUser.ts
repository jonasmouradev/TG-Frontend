import { useCase } from '@shared/contexts/UseCaseContext';
import {
  GetMeUseCase,
  GetUserUseCase,
  UpdateUserUseCase,
  GetCurrentUserUseCase,
  UpdateUserEmailUseCase,
  UpdateUserSessionUseCase,
} from '@core/application/use-cases';

export function useUserCases() {
  const { userGateway, cookieStorage, crypto } = useCase();

  return {
    getMe: new GetMeUseCase(userGateway).execute,
    findOne: new GetUserUseCase(userGateway).execute,
    update: new UpdateUserUseCase(userGateway).execute,
    updateEmail: new UpdateUserEmailUseCase(userGateway).execute,
    getCurrent: new GetCurrentUserUseCase(crypto, cookieStorage).execute,
    updateSession: new UpdateUserSessionUseCase(crypto, cookieStorage).execute,
  };
}
