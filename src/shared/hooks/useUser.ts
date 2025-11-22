import { useCase } from '@shared/contexts/UseCaseContext';
import {
  GetMeUseCase,
  GetUserUseCase,
  UpdateUserUseCase,
  GetCurrentUserUseCase,
  UpdateUserEmailUseCase,
  UpdateUserSessionUseCase,
  GetUserUseCaseInput,
  UpdateUserUseCaseInput,
  UpdateUserEmailUseCaseInput,
} from '@core/application/use-cases';
import { useMemo } from 'react';
import { User } from '@core/domain';

export function useUserCases() {
  const container = useCase();

  if (!container) {
    throw new Error('useUserCases must be used within UseCaseContext.Provider');
  }

  const { userGateway, cookieStorage, crypto } = container;

  const userCases = useMemo(
    () => ({
      getMe: () => new GetMeUseCase(userGateway).execute(),
      findOne: (input: GetUserUseCaseInput) => new GetUserUseCase(userGateway).execute(input),
      update: (input: UpdateUserUseCaseInput) => new UpdateUserUseCase(userGateway).execute(input),
      updateEmail: (input: UpdateUserEmailUseCaseInput) => new UpdateUserEmailUseCase(userGateway).execute(input),
      getCurrent: () => new GetCurrentUserUseCase(crypto, cookieStorage).execute(),
      updateSession: (input: User) => new UpdateUserSessionUseCase(crypto, cookieStorage).execute(input),
    }),
    [userGateway, cookieStorage, crypto],
  );

  return userCases;
}
