export type CandidateStatus = 'ACTIVE' | 'APPROVED' | 'REJECTED' | 'IN_PROGRESS' | 'WITHDRAWN';

export type Candidate = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  position: string;
  processName: string;
  status: CandidateStatus;
  appliedAt: string;
  updatedAt: string;
  resumeUrl?: string;
  score?: number;
  currentStage?: string;
  avatar?: string;
};

export type CandidateFilters = {
  status?: CandidateStatus;
  position?: string;
  processName?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
};

export const statusColors = {
  ACTIVE: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  APPROVED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  REJECTED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  IN_PROGRESS: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  WITHDRAWN: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
};

export const statusLabels = {
  ACTIVE: 'Ativo',
  APPROVED: 'Aprovado',
  REJECTED: 'Rejeitado',
  IN_PROGRESS: 'Em Andamento',
  WITHDRAWN: 'Desistiu',
};

export const statusOptions: { value: CandidateStatus; label: string }[] = [
  { value: 'ACTIVE', label: 'Ativo' },
  { value: 'APPROVED', label: 'Aprovado' },
  { value: 'REJECTED', label: 'Rejeitado' },
  { value: 'IN_PROGRESS', label: 'Em Andamento' },
  { value: 'WITHDRAWN', label: 'Desistiu' },
];
