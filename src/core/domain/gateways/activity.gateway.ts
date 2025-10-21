import { PromiseResponse } from '@/core/domain/ports/http-client.port';

// Domain DTOs
export interface RecruitmentProcessDto {
  id: string;
  title: string;
  stage: string;
  recruiter: string;
  startDate: string;
  endDate?: string;
  status: 'open' | 'closed';
  vacancyId?: string;
  companyId?: string;
}

export interface ProcessFilters {
  status?: 'open' | 'closed' | 'all';
  companyId?: string;
  recruiterId?: string;
  limit?: number;
  offset?: number;
}

export interface ActivityLogDto {
  id: string;
  message: string;
  type: 'application' | 'process_stage' | 'test_completion' | 'other';
  processId?: string;
  candidateId?: string;
  timestamp: string;
}

export interface GetActivitiesResponse {
  activities: ActivityLogDto[];
  totalCount: number;
}

export interface GetProcessesResponse {
  processes: RecruitmentProcessDto[];
  totalCount: number;
}

// Gateway Interface
export interface ActivityGateway {
  /**
   * Get recruitment processes based on filters
   */
  getRecruitmentProcesses(filters?: ProcessFilters): PromiseResponse<GetProcessesResponse>;

  /**
   * Get recent activities/logs for processes
   */
  getRecentActivities(filters?: { limit?: number; companyId?: string }): PromiseResponse<GetActivitiesResponse>;

  /**
   * Get a specific recruitment process by ID
   */
  getRecruitmentProcessById(id: string): PromiseResponse<RecruitmentProcessDto>;
}
