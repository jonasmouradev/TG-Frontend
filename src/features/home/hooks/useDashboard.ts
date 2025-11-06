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

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  status: 'active' | 'draft' | 'closed';
  candidates: number;
  newCandidates: number;
  daysOpen: number;
  createdAt: string;
}

export interface Candidate {
  id: string;
  name: string;
  job: string;
  stage: string;
  time: string;
  avatar: string;
}

// Dashboard services using the existing API structure but prepared for use case integration
const dashboardServices = {
  async getDashboardStats(): Promise<DashboardStats> {
    // TODO: Replace with GetDashboardStatsUseCase
    console.log('Fetching dashboard stats');
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          activeJobs: 12,
          totalCandidates: 248,
          newApplications: 34,
          scheduledInterviews: 8,
          conversionRate: 24,
          avgProcessTime: 12,
          satisfaction: 4.8,
        });
      }, 1000);
    });
  },

  async getRecentJobs(): Promise<Job[]> {
    // TODO: Replace with GetRecentJobsUseCase or similar
    console.log('Fetching recent jobs');
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            title: 'Desenvolvedor Front-end Sênior',
            department: 'Tecnologia',
            location: 'São Paulo, SP',
            type: 'CLT',
            status: 'active',
            candidates: 45,
            newCandidates: 12,
            daysOpen: 5,
            createdAt: '2024-01-15',
          },
          {
            id: '2',
            title: 'Designer UX/UI Pleno',
            department: 'Design',
            location: 'Remoto',
            type: 'PJ',
            status: 'active',
            candidates: 32,
            newCandidates: 8,
            daysOpen: 12,
            createdAt: '2024-01-10',
          },
          {
            id: '3',
            title: 'Gerente de Produto',
            department: 'Produto',
            location: 'São Paulo, SP',
            type: 'CLT',
            status: 'active',
            candidates: 28,
            newCandidates: 5,
            daysOpen: 8,
            createdAt: '2024-01-12',
          },
          {
            id: '4',
            title: 'Analista de Marketing Digital',
            department: 'Marketing',
            location: 'Híbrido',
            type: 'CLT',
            status: 'draft',
            candidates: 0,
            newCandidates: 0,
            daysOpen: 1,
            createdAt: '2024-01-18',
          },
        ]);
      }, 800);
    });
  },

  async getRecentCandidates(): Promise<Candidate[]> {
    // TODO: Replace with GetRecentCandidatesUseCase or GetRecentApplicationsUseCase
    console.log('Fetching recent candidates');
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            name: 'Ana Silva',
            job: 'Desenvolvedor Front-end Sênior',
            stage: 'Entrevista Técnica',
            time: '2h atrás',
            avatar: 'AS',
          },
          {
            id: '2',
            name: 'Carlos Santos',
            job: 'Designer UX/UI Pleno',
            stage: 'Análise de Portfólio',
            time: '5h atrás',
            avatar: 'CS',
          },
          {
            id: '3',
            name: 'Mariana Costa',
            job: 'Gerente de Produto',
            stage: 'Triagem',
            time: '1d atrás',
            avatar: 'MC',
          },
          {
            id: '4',
            name: 'Pedro Oliveira',
            job: 'Desenvolvedor Front-end Sênior',
            stage: 'Proposta Enviada',
            time: '2d atrás',
            avatar: 'PO',
          },
        ]);
      }, 600);
    });
  },
};

export const useDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [recentCandidates, setRecentCandidates] = useState<Candidate[]>([]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Load all dashboard data in parallel
      const [statsData, jobsData, candidatesData] = await Promise.all([
        dashboardServices.getDashboardStats(),
        dashboardServices.getRecentJobs(),
        dashboardServices.getRecentCandidates(),
      ]);

      setStats(statsData);
      setRecentJobs(jobsData);
      setRecentCandidates(candidatesData);
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
