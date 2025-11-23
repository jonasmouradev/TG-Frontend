import { CompanyGateway, UpdateCompanyDto } from '@core/domain/gateways/company.gateway';
import { Company } from '@core/domain/entities';
import { IUseCase } from '@core/domain/use-case.interface';

export interface UpdateCompanyInput {
  id: string;
  payload: UpdateCompanyDto;
}

export interface UpdateCompanyOutput {
  company: Company;
}

export class UpdateCompanyUseCase implements IUseCase<UpdateCompanyInput, UpdateCompanyOutput> {
  constructor(private readonly gateway: CompanyGateway) {}

  async execute(input: UpdateCompanyInput): Promise<UpdateCompanyOutput> {
    const response = await this.gateway.update(input.id, input.payload);
    if (!response.data) {
      throw new Error('Company not found');
    }

    return {
      company: response.data,
    };
  }
}
