import { Application, ApplicationStatus, PaginatedList } from '@core/domain/entities';
import { PromiseResponse } from '../ports/http-client.port';

type Filters = {
  applicantId?: string;
  vacancyId?: string;
  status?: ApplicationStatus;
  dateFrom?: string;
  dateTo?: string;
};

type Create = {
  applicantId: string;
  vacancyId: string;
  resumeUrl: string;
  coverLetter?: string;
};

type Update = {
  status?: ApplicationStatus;
  resumeUrl?: string;
  coverLetter?: string;
};

type ApplicationList = PaginatedList<Application>;

export interface ApplicationGateway {
  findOne(id: string): PromiseResponse<Application | null>;
  findAll(params?: Filters): PromiseResponse<ApplicationList>;
  findByVacancy(vacancyId: string): PromiseResponse<ApplicationList>;
  findByApplicant(applicantId: string): PromiseResponse<ApplicationList>;
  create(payload: Create): PromiseResponse<Application | null>;
  update(id: string, payload: Update): PromiseResponse<Application | null>;
  remove(id: string): PromiseResponse<void | null>;
  updateStatus(id: string, payload: { status: ApplicationStatus }): PromiseResponse<Application | null>;
}

export type {
  ApplicationList,
  Filters as ApplicationFilters,
  Update as UpdateApplicationDto,
  Create as CreateApplicationDto,
};
