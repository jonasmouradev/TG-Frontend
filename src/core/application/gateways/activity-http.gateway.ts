import {
  ActivityGateway,
  ProcessFilters,
  GetProcessesResponse,
  GetActivitiesResponse,
  RecruitmentProcessDto,
} from '@core/domain/gateways/activity.gateway';
import { IHttpClient, PromiseResponse } from '@core/domain/ports/http-client.port';

export class ActivityHttpGateway implements ActivityGateway {
  constructor(private readonly httpClient: IHttpClient) {}

  async getRecruitmentProcesses(filters?: ProcessFilters): PromiseResponse<GetProcessesResponse> {
    const params: Record<string, string | number> = {};

    if (filters?.status && filters.status !== 'all') {
      params.status = filters.status;
    }
    if (filters?.companyId) {
      params.companyId = filters.companyId;
    }
    if (filters?.recruiterId) {
      params.recruiterId = filters.recruiterId;
    }
    if (filters?.limit) {
      params.limit = filters.limit;
    }
    if (filters?.offset) {
      params.offset = filters.offset;
    }

    return this.httpClient.get<GetProcessesResponse>({
      url: '/recruitment-processes',
      params,
    });
  }

  async getRecentActivities(filters?: { limit?: number; companyId?: string }): PromiseResponse<GetActivitiesResponse> {
    const params: Record<string, string | number> = {};

    if (filters?.limit) {
      params.limit = filters.limit;
    }
    if (filters?.companyId) {
      params.companyId = filters.companyId;
    }

    return this.httpClient.get<GetActivitiesResponse>({
      url: '/activities/recent',
      params,
    });
  }

  async getRecruitmentProcessById(id: string): PromiseResponse<RecruitmentProcessDto> {
    return this.httpClient.get<RecruitmentProcessDto>({
      url: `/recruitment-processes/${id}`,
    });
  }
}
