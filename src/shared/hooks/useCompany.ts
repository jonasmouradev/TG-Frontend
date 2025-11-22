import { useCase } from '@shared/contexts/UseCaseContext';
import {
  GetCompanyUseCase,
  CreateCompanyUseCase,
  SetCompanyIdUseCase,
  GetCompanyIdUseCase,
  GetCompanyStatisticsUseCase,
} from '@core/application/use-cases';

export function useCompanyCases() {
  const { companyGateway, cookieStorage, crypto } = useCase();

  return {
    findOne: new GetCompanyUseCase(companyGateway).execute,
    create: new CreateCompanyUseCase(companyGateway).execute,
    setId: new SetCompanyIdUseCase(cookieStorage).execute,
    getId: new GetCompanyIdUseCase(crypto, cookieStorage).execute,
    getStatistics: new GetCompanyStatisticsUseCase(companyGateway).execute,
  };
}
