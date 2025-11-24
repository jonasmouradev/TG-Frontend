import { useCase } from '@shared/contexts/UseCaseContext';
import {
  GetCompanyUseCase,
  CreateCompanyUseCase,
  GetCompanyIdUseCase,
  GetCompanyStatisticsUseCase,
  CreateCompanyUseCaseInput,
  GetCompanyStatisticsUseCaseInput,
} from '@core/application/use-cases';
import { GetCompanyInput, GetCompanyOutput } from '@core/application/use-cases/company/get-company.use-case';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QueryHookOptions } from '..';
import { SetCompanyIdUseCase } from '@core/application/use-cases/auth/set-company-id.use-case';

export function useCompanyCases() {
  const { companyGateway, cookieStorage, crypto } = useCase();

  function useGetCompany({ input, ...options }: QueryHookOptions<GetCompanyInput, GetCompanyOutput>) {
    return useQuery({
      queryKey: GetCompanyUseCase.queryKey(input),
      queryFn: () => new GetCompanyUseCase(companyGateway).execute(input),
      ...options,
    });
  }

  const cases = useMemo(
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

  return {
    ...cases,
    useGetCompany,
  };
}
