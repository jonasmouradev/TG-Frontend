import { Vacancy } from '@core/domain';
import { useDashboardCases, useVacancyCases } from '@shared/hooks';
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
  const { useGetVacancies, useGetPublishedVacancy } = useVacancyCases();
  const { useGetDashboardStats, useGetRecentApplications } = useDashboardCases();

  const { data: statsData } = useGetDashboardStats({
    input: {},
    enabled: true,
  });

  const { data: recentApplicationsData } = useGetRecentApplications({
    input: { limit: 5 },
    enabled: true,
  });

  const { data: vacanciesData } = useGetVacancies({
    input: {},
    enabled: true,
  });

  const { data: publishedVacancies } = useGetPublishedVacancy({ enabled: true });

  const loadDashboardData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!statsData || !recentApplicationsData || !vacanciesData) {
        throw new Error('Failed to load dashboard data');
      }
      setStats({
        activeJobs: statsData.stats.totalVacancies,
        totalCandidates: statsData.stats.totalApplications,
        newApplications: statsData.stats.totalVacancies, // TODO: adjust when backend provides this data
        scheduledInterviews: statsData.stats.totalUsers,
        conversionRate: 24,
        avgProcessTime: 12,
        satisfaction: 4.8,
      });
      setRecentJobs(vacanciesData?.data || []);
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
    publishedVacancies,
    refreshData,
  };
};
