import { CompanyGateway, CompanyStatistics } from '@core/domain/gateways/company.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export interface GetCompanyStatisticsUseCaseInput {
  companyId: string;
}

export interface GetCompanyStatisticsUseCaseOutput {
  statistics: CompanyStatistics;
}

export class GetCompanyStatisticsUseCase
  implements IUseCase<GetCompanyStatisticsUseCaseInput, GetCompanyStatisticsUseCaseOutput>
{
  constructor(private readonly gateway: CompanyGateway) {}

  async execute(input: GetCompanyStatisticsUseCaseInput): Promise<GetCompanyStatisticsUseCaseOutput> {
    const response = await this.gateway.getCompanyStatistics(input.companyId);

    if (!response.data) {
      throw new Error('Failed to get company statistics');
    }

    return {
      statistics: response.data,
    };
  }
}
