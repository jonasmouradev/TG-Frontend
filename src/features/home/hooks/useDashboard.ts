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

  const {
    data: statsData,
    isFetching: isStatsFetching,
    refetch: refetchStats,
  } = useGetDashboardStats({
    input: {},
    enabled: true,
  });

  const {
    data: recentApplicationsData,
    isFetching: isRecentFetching,
    refetch: refetchRecent,
  } = useGetRecentApplications({
    input: { limit: 5 },
    enabled: true,
  });

  const {
    data: vacanciesData,
    isFetching: isVacanciesFetching,
    refetch: refetchVacancies,
  } = useGetVacancies({
    input: {},
    enabled: true,
  });

  const { data: publishedVacancies, refetch: refetchPublished } = useGetPublishedVacancy({ enabled: true });

  // Atualiza o estado de loading com base nas queries ativas
  useEffect(() => {
    setIsLoading(Boolean(isStatsFetching || isRecentFetching || isVacanciesFetching));
  }, [isStatsFetching, isRecentFetching, isVacanciesFetching]);

  // Quando todas as queries disponibilizarem dados, popula os estados
  useEffect(() => {
    try {
      if (!statsData || !recentApplicationsData || !vacanciesData) return;

      setError(null);
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
  }, [statsData, recentApplicationsData, vacanciesData]);

  const refreshData = async () => {
    await Promise.all([refetchStats?.(), refetchRecent?.(), refetchVacancies?.(), refetchPublished?.()]);
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
