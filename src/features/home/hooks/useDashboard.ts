import { Vacancy } from '@core/domain';
import { container } from '@core/infra/container';
import { useDashboardCases, useVacancyCases } from '@shared/hooks';
import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';

interface DashboardStats {
  activeJobs: number;
  totalCandidates: number;
  newApplications: number;
  scheduledInterviews: number;
  conversionRate: number;
  avgProcessTime: number;
  satisfaction: number;
}

export interface Candidate {
  id: string;
  name: string;
  job: string;
  stage: string;
  time: string;
  avatar: string;
}

export const useDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentJobs, setRecentJobs] = useState<Vacancy[]>([]);
  const [recentCandidates, setRecentCandidates] = useState<Candidate[]>([]);
  const { getPublished } = useVacancyCases();
  const { getStats, getRecentApplications } = useDashboardCases();

  const loadDashboardData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Load all dashboard data in parallel
      const [statsData, jobsData, candidatesData] = await Promise.all([
        getStats(),
        getPublished(),
        getRecentApplications({}),
      ]);

      setStats({
        activeJobs: statsData.stats.totalVacancies,
        totalCandidates: statsData.stats.totalApplications,
        newApplications: statsData.stats.recentApplications.length,
        scheduledInterviews: statsData.stats.totalUsers,
        conversionRate: 24,
        avgProcessTime: 12,
        satisfaction: 4.8,
      });
      setRecentJobs(
        jobsData.data.map(
          job =>
            new Vacancy({
              ...job,
              createdAt: job.createdAt,
              updatedAt: job.updatedAt,
            }),
        ),
        //   [
        //   {
        //     id: '14c69c82-a715-4846-be58-ca063f6651b0',
        //     title: 'Back-end Sênior',
        //     description: 'Descrição da vaga',
        //     location: 'SP',
        //     salary_min: '5000.00',
        //     salary_max: '10000.00',
        //     currency: 'R$',
        //     type: 'full_time',
        //     contract: 'clt',
        //     work_mode: 'hybrid',
        //     level: 'junior',
        //     status: 'published',
        //     publication_date: '2025-11-21T00:00:00.000Z',
        //     expiration_date: '2025-12-21T00:00:00.000Z',
        //     area: null,
        //     company_id: 'b5f313dc-2639-45bf-b4ba-51be8c5855b7',
        //     created_at: '2025-11-22T00:09:21.602Z',
        //     updated_at: '2025-11-22T00:09:21.680Z',
        //     deleted_at: null,
        //     createdAt: DateTime.fromISO('2025-11-22T00:09:21.602Z'),
        //     updatedAt: DateTime.fromISO('2025-11-22T00:09:21.680Z'),
        //     deletedAt: null,
        //     company: { id: 'b5f313dc-2639-45bf-b4ba-51be8c5855b7', cnpj: '17.960.701/0001-75' },
        //   },
        // ]
      );
      setRecentCandidates([
        {
          id: '4',
          name: 'Pedro Oliveira',
          job: 'Desenvolvedor Front-end Sênior',
          stage: 'Proposta Enviada',
          time: '2d atrás',
          avatar: 'PO',
        },
      ]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar dados do dashboard';
      setError(errorMessage);
      console.error('Error loading dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const refreshData = async () => {
    await loadDashboardData();
  };

  return {
    isLoading,
    error,
    stats,
    recentJobs,
    recentCandidates,
    refreshData,
  };
};
