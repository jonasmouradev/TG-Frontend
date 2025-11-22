import { Vacancy } from '@core/domain';
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
  const { getRecentApplications, getStats } = useDashboardCases();

  const loadDashboardData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Load all dashboard data in parallel
      const [statsData] = await Promise.all([getStats(), getPublished(), getRecentApplications({})]);

      setStats({
        activeJobs: statsData.stats.totalVacancies,
        totalCandidates: statsData.stats.totalApplications,
        newApplications: statsData.stats.totalVacancies, // TODO: adjust when backend provides this data
        scheduledInterviews: statsData.stats.totalUsers,
        conversionRate: 24,
        avgProcessTime: 12,
        satisfaction: 4.8,
      });
      setRecentJobs([
        new Vacancy({
          id: '14c69c82-a715-4846-be58-ca063f6651b0',
          title: 'Back-end Sênior',
          description: 'Descrição da vaga',
          location: 'SP',
          salaryMin: 500000,
          salaryMax: 1000000,
          currency: 'R$',
          type: 'full_time',
          level: 'junior',
          status: 'published',
          companyId: 'b5f313dc-2639-45bf-b4ba-51be8c5855b7',
          createdAt: DateTime.fromISO('2025-11-22T00:09:21.602Z'),
          updatedAt: DateTime.fromISO('2025-11-22T00:09:21.680Z'),
          expirationDate: DateTime.fromISO('2026-01-21T00:09:21.000Z'),
          publicationDate: DateTime.fromISO('2025-11-22T00:09:21.000Z'),
          remote: false,
          requirements: ['Requisito 1', 'Requisito 2'],
          responsibilities: ['Responsabilidade 1', 'Responsabilidade 2'],
          benefits: ['Benefício 1', 'Benefício 2'],
        }),
      ]);
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
