import { PromiseResponse } from '../ports/http-client.port';

type DashboardStats = {
  totalApplications: number;
  totalVacancies: number;
  totalCompanies: number;
  totalUsers: number;
  recentApplications: RecentApplication[];
  topVacancies: TopVacancy[];
  applicationsByStatus: ApplicationStatusCount[];
  monthlyApplications: MonthlyApplicationCount[];
};

type RecentApplication = {
  id: string;
  applicantName: string;
  vacancyTitle: string;
  companyName: string;
  status: string;
  appliedAt: Date;
};

type TopVacancy = {
  id: string;
  title: string;
  companyName: string;
  applicationCount: number;
  publishedAt: Date;
};

type ApplicationStatusCount = {
  status: string;
  count: number;
  percentage: number;
};

type MonthlyApplicationCount = {
  month: string;
  year: number;
  count: number;
};

type DashboardFilters = {
  dateFrom?: string;
  dateTo?: string;
  period?: PeriodFilter;
};

type VacancyStats = {
  totalApplications: number;
};

type PeriodFilter = 'week' | 'month' | 'quarter' | 'year';

export interface DashboardGateway {
  findGeneralStats(params?: DashboardFilters): PromiseResponse<DashboardStats | null>;
  findStatsByVacancy(vacancyId: string): PromiseResponse<VacancyStats | null>;
  getCompanyStats(params?: DashboardFilters): PromiseResponse<DashboardStats | null>;
  getRecentApplications(limit?: number, companyId?: string): PromiseResponse<any | null>;
  getTopVacancies(limit?: number, companyId?: string): PromiseResponse<any | null>;
  getApplicationsByStatus(companyId?: string): PromiseResponse<any | null>;
  getMonthlyApplications(months?: number, companyId?: string): PromiseResponse<any | null>;
}

export type { DashboardStats, VacancyStats, DashboardFilters, PeriodFilter };
