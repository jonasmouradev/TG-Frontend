import { ApplicationGateway, ApplicationFilters } from '@core/domain/gateways/application.gateway';
import { Application, ApplicationStatus } from '@core/domain/entities';
import { IUseCase } from '@core/domain/use-case.interface';

export interface GetApplicationsUseCaseInput {
  applicantId?: string;
  vacancyId?: string;
  status?: ApplicationStatus;
  dateFrom?: string;
  dateTo?: string;
}

export interface GetApplicationsUseCaseOutput {
  applications: Application[];
  total: number;
  page: number;
  limit: number;
}

export class GetApplicationsUseCase implements IUseCase<GetApplicationsUseCaseInput, GetApplicationsUseCaseOutput> {
  constructor(private readonly gateway: ApplicationGateway) {}

  async execute(input?: GetApplicationsUseCaseInput): Promise<GetApplicationsUseCaseOutput> {
    const filters: ApplicationFilters = {
      applicantId: input?.applicantId,
      vacancyId: input?.vacancyId,
      status: input?.status,
      dateFrom: input?.dateFrom,
      dateTo: input?.dateTo,
    };

    const response = await this.gateway.findAll(filters);

    if (!response.data) {
      throw new Error('Failed to get applications');
    }

    return {
      applications: response.data.data,
      total: response.data.meta.total,
      page: response.data.meta.currentPage,
      limit: response.data.meta.perPage,
    };
  }
}
