import { CompanyGateway } from '@core/domain/gateways/company.gateway';
import { Company } from '@core/domain/entities';
import { IUseCase } from '@core/domain/use-case.interface';

export interface GetCompanyInput {
  id: string;
}

export interface GetCompanyOutput {
  company: Company;
}

export class GetCompanyUseCase implements IUseCase<GetCompanyInput, GetCompanyOutput> {
  constructor(private readonly gateway: CompanyGateway) {}

  public static readonly queryKey = (input: Partial<GetCompanyInput>) => ['company', input];

  async execute(input: GetCompanyInput): Promise<GetCompanyOutput> {
    const response = await this.gateway.findOne(input.id);

    if (!response.data) {
      throw new Error('Company not found');
    }

    return {
      company: response.data,
    };
  }
}
