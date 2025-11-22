import { CompanyGateway, CreateCompanyDto } from '@core/domain/gateways/company.gateway';
import { Company } from '@core/domain/entities';
import { IUseCase } from '@core/domain/use-case.interface';

export interface CreateCompanyUseCaseInput {
  name: string;
  address?: string;
  avatar?: string;
}

export interface CreateCompanyUseCaseOutput {
  company: Company;
}

export class CreateCompanyUseCase implements IUseCase<CreateCompanyUseCaseInput, CreateCompanyUseCaseOutput> {
  constructor(private readonly gateway: CompanyGateway) {}

  async execute(input: CreateCompanyUseCaseInput): Promise<CreateCompanyUseCaseOutput> {
    const createCompanyDto: CreateCompanyDto = {
      name: input.name,
      address: input.address,
      avatar: input.avatar,
    };

    const response = await this.gateway.create(createCompanyDto);

    if (!response.data) {
      throw new Error('Failed to create company');
    }

    return {
      company: response.data,
    };
  }
}
