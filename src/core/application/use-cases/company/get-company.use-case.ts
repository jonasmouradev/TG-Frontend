import { CompanyGateway } from '@/core/domain/gateways/company.gateway';
import { Company } from '@/core/domain/entities';
import { IUseCase } from '@/core/domain/use-case.interface';

export interface GetCompanyUseCaseInput {
  id: string;
}

export interface GetCompanyUseCaseOutput {
  company: Company;
}

export class GetCompanyUseCase implements IUseCase<GetCompanyUseCaseInput, GetCompanyUseCaseOutput> {
  constructor(private companyGateway: CompanyGateway) {}

  async execute(input: GetCompanyUseCaseInput): Promise<GetCompanyUseCaseOutput> {
    const response = await this.companyGateway.findOne(input.id);

    if (!response.data) {
      throw new Error('Company not found');
    }

    return {
      company: response.data,
    };
  }
}
