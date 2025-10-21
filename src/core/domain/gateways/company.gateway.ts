import { PromiseResponse } from '../ports/http-client.port';

type Company = {
  id: string;
  name: string;
  address?: string;
  avatar?: string;
  userId?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
};

type CreateCompanyDto = {
  name: string;
  address?: string;
  avatar?: string;
};

type UpdateCompanyDto = {
  name?: string;
  address?: string;
  avatar?: string;
};

type CompanyFilters = {
  name?: string;
  userId?: string;
  page?: number;
  limit?: number;
};

type CompanyList = {
  companies: Company[];
  total: number;
  page: number;
  limit: number;
};

type CompanyStatistics = {
  totalVacancies: number;
  openVacancies: number;
  closedVacancies: number;
  draftVacancies: number;
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  totalUsers: number;
  activeUsers: number;
};

export interface CompanyGateway {
  findOne(id: string): PromiseResponse<Company | null>;
  findAll(params?: CompanyFilters): PromiseResponse<CompanyList | null>;
  create(payload: CreateCompanyDto): PromiseResponse<Company | null>;
  update(id: string, payload: UpdateCompanyDto): PromiseResponse<Company | null>;
  remove(id: string): PromiseResponse<void | null>;
  getCompanyVacancies(
    companyId: string,
    params?: {
      status?: string;
      area?: string;
      page?: number;
      limit?: number;
    },
  ): PromiseResponse<any | null>;
  getCompanyUsers(
    companyId: string,
    params?: {
      type?: string;
      status?: string;
      page?: number;
      limit?: number;
    },
  ): PromiseResponse<any | null>;
  getCompanyStatistics(companyId: string): PromiseResponse<CompanyStatistics | null>;
}

export type { CreateCompanyDto, UpdateCompanyDto, CompanyFilters, CompanyList, CompanyStatistics };
