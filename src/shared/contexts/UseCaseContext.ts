import { DIContainer } from '@core/infra/container';
import { createContext, useContext } from 'react';

export const UseCaseContext = createContext<DIContainer>({} as DIContainer);

export function useCase(): DIContainer {
  return useContext(UseCaseContext);
}
