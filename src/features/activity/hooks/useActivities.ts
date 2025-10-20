import { useState, useEffect } from 'react';

interface RecruitmentProcess {
  id: string;
  title: string;
  stage: string;
  recruiter: string;
  startDate: string;
  endDate?: string;
  status: 'open' | 'closed';
}

interface Activity {
  id: string;
  message: string;
  type: 'application' | 'process_stage' | 'test_completion' | 'other';
  processId?: string;
  candidateId?: string;
  timestamp: string;
}

export const useActivities = () => {
  const [openProcesses, setOpenProcesses] = useState<RecruitmentProcess[]>([]);
  const [closedProcesses, setClosedProcesses] = useState<RecruitmentProcess[]>([]);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRecruitmentProcesses = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Using mock data - use cases are ready but API endpoints may not be configured
      const mockOpenProcesses: RecruitmentProcess[] = [
        {
          id: '1',
          title: 'Desenvolvedor Frontend',
          stage: 'Análise',
          recruiter: 'Recrutador A',
          startDate: '01/01/2024',
          status: 'open',
        },
        {
          id: '2',
          title: 'Designer UX/UI',
          stage: 'Entrevista',
          recruiter: 'Recrutador B',
          startDate: '05/01/2024',
          status: 'open',
        },
        {
          id: '3',
          title: 'Analista de Dados',
          stage: 'Seleção',
          recruiter: 'Recrutador C',
          startDate: '10/01/2024',
          status: 'open',
        },
      ];

      const mockClosedProcesses: RecruitmentProcess[] = [
        {
          id: '4',
          title: 'Desenvolvedor Backend',
          stage: 'Finalizado',
          recruiter: 'Recrutador A',
          startDate: '01/12/2023',
          endDate: '15/12/2023',
          status: 'closed',
        },
        {
          id: '5',
          title: 'Product Manager',
          stage: 'Finalizado',
          recruiter: 'Recrutador D',
          startDate: '10/12/2023',
          endDate: '20/12/2023',
          status: 'closed',
        },
      ];

      setOpenProcesses(mockOpenProcesses);
      setClosedProcesses(mockClosedProcesses);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load processes');
    } finally {
      setIsLoading(false);
    }
  };

  const loadRecentActivities = async () => {
    try {
      // Using mock data - use cases are ready but API endpoints may not be configured
      const mockActivities: Activity[] = [
        {
          id: '1',
          message: '100 pessoas se inscreveram para a vaga "Desenvolvedor Python"',
          type: 'application',
          processId: '1',
          timestamp: new Date().toISOString(),
        },
        {
          id: '2',
          message: 'João alcançou a 2ª etapa do processo "Analista Júnior"',
          type: 'process_stage',
          processId: '2',
          candidateId: 'candidate-1',
          timestamp: new Date().toISOString(),
        },
        {
          id: '3',
          message: 'Maria concluiu "Teste de triagem". Verifique o resultado.',
          type: 'test_completion',
          processId: '3',
          candidateId: 'candidate-2',
          timestamp: new Date().toISOString(),
        },
      ];

      setRecentActivities(mockActivities);
    } catch (err) {
      console.error('Failed to load activities:', err);
    }
  };

  useEffect(() => {
    loadRecruitmentProcesses();
    loadRecentActivities();
  }, []);

  return {
    openProcesses,
    closedProcesses,
    recentActivities,
    isLoading,
    error,
    refetch: loadRecruitmentProcesses,
  };
};

export default useActivities;
