import { useCase } from '@shared/contexts/UseCaseContext';
import {
  GetCompanyUseCase,
  CreateCompanyUseCase,
  SetCompanyIdUseCase,
  GetCompanyIdUseCase,
  GetCompanyStatisticsUseCase,
  CreateCompanyUseCaseInput,
  GetCompanyStatisticsUseCaseInput,
} from '@core/application/use-cases';
import { GetCompanyInput } from '@core/application/use-cases/company/get-company.use-case';
import { useMemo } from 'react';

export function useCompanyCases() {
  const container = useCase();

  if (!container) {
    throw new Error('useCompanyCases must be used within UseCaseContext.Provider');
  }

  const { companyGateway, cookieStorage, crypto } = container;

  const companyCases = useMemo(
    () => ({
      findOne: (input: GetCompanyInput) => new GetCompanyUseCase(companyGateway).execute(input),
      create: (input: CreateCompanyUseCaseInput) => new CreateCompanyUseCase(companyGateway).execute(input),
      setId: (input: string) => new SetCompanyIdUseCase(cookieStorage).execute(input),
      getId: () => new GetCompanyIdUseCase(crypto, cookieStorage).execute(),
      getStatistics: (input: GetCompanyStatisticsUseCaseInput) =>
        new GetCompanyStatisticsUseCase(companyGateway).execute(input),
    }),
    [companyGateway, cookieStorage, crypto],
  );

  return companyCases;
}
