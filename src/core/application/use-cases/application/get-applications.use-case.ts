import { ApplicationGateway, ApplicationFilters } from '@core/domain/gateways/application.gateway';
import { Application, ApplicationStatus, PaginatedList } from '@core/domain/entities';
import { IUseCase } from '@core/domain/use-case.interface';

export interface GetApplicationsUseCaseInput {
  applicantId?: string;
  vacancyId?: string;
  status?: ApplicationStatus;
  dateFrom?: string;
  dateTo?: string;
}

export type GetApplicationsUseCaseOutput = PaginatedList<Application>;

export class GetApplicationsUseCase implements IUseCase<GetApplicationsUseCaseInput, GetApplicationsUseCaseOutput> {
  constructor(private readonly gateway: ApplicationGateway) {}

  public static readonly queryKey = (input: Partial<GetApplicationsUseCaseInput>) => ['applications', input];

  async execute(input?: GetApplicationsUseCaseInput): Promise<GetApplicationsUseCaseOutput> {
    const filters: ApplicationFilters = {
      applicantId: input?.applicantId,
      vacancyId: input?.vacancyId,
      status: input?.status,
      dateFrom: input?.dateFrom,
      dateTo: input?.dateTo,
    };

    const response = await this.gateway.findAll(filters);

    if (!response?.data) {
      throw new Error('Failed to get applications');
    }

    return {
      data: response?.data.data,
      meta: response?.data.meta,
    };
  }
}
