import { useState, useEffect } from 'react';
import { Candidate, CandidateFilters } from '../types';

// Mock data para demonstração
const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 98765-4321',
    position: 'Desenvolvedor Frontend',
    processName: 'Processo Seletivo Tech 2024',
    status: 'IN_PROGRESS',
    appliedAt: '2024-10-15T10:00:00Z',
    updatedAt: '2024-11-01T14:30:00Z',
    score: 85,
    currentStage: 'Entrevista Técnica',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '(11) 97654-3210',
    position: 'Desenvolvedor Backend',
    processName: 'Processo Seletivo Tech 2024',
    status: 'APPROVED',
    appliedAt: '2024-10-10T09:00:00Z',
    updatedAt: '2024-10-25T16:00:00Z',
    score: 92,
    currentStage: 'Aprovado',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: '3',
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@email.com',
    phone: '(21) 99876-5432',
    position: 'UX Designer',
    processName: 'Design Team 2024',
    status: 'ACTIVE',
    appliedAt: '2024-11-01T08:00:00Z',
    updatedAt: '2024-11-05T10:00:00Z',
    score: 78,
    currentStage: 'Triagem Inicial',
    avatar: 'https://i.pravatar.cc/150?img=33',
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    phone: '(31) 98765-1234',
    position: 'Product Manager',
    processName: 'Liderança 2024',
    status: 'REJECTED',
    appliedAt: '2024-09-20T11:00:00Z',
    updatedAt: '2024-10-05T15:00:00Z',
    score: 65,
    currentStage: 'Rejeitado',
    avatar: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: '5',
    name: 'Carlos Ferreira',
    email: 'carlos.ferreira@email.com',
    phone: '(41) 97654-8765',
    position: 'DevOps Engineer',
    processName: 'Infraestrutura 2024',
    status: 'IN_PROGRESS',
    appliedAt: '2024-10-25T13:00:00Z',
    updatedAt: '2024-11-08T09:00:00Z',
    score: 88,
    currentStage: 'Desafio Técnico',
    avatar: 'https://i.pravatar.cc/150?img=15',
  },
  {
    id: '6',
    name: 'Juliana Almeida',
    email: 'juliana.almeida@email.com',
    phone: '(51) 99123-4567',
    position: 'Desenvolvedor Frontend',
    processName: 'Processo Seletivo Tech 2024',
    status: 'WITHDRAWN',
    appliedAt: '2024-10-05T10:00:00Z',
    updatedAt: '2024-10-18T11:00:00Z',
    score: 70,
    currentStage: 'Desistiu',
    avatar: 'https://i.pravatar.cc/150?img=20',
  },
  {
    id: '7',
    name: 'Roberto Lima',
    email: 'roberto.lima@email.com',
    phone: '(61) 98234-5678',
    position: 'Data Scientist',
    processName: 'Data Team 2024',
    status: 'APPROVED',
    appliedAt: '2024-09-15T09:00:00Z',
    updatedAt: '2024-10-10T14:00:00Z',
    score: 95,
    currentStage: 'Aprovado',
    avatar: 'https://i.pravatar.cc/150?img=8',
  },
  {
    id: '8',
    name: 'Fernanda Souza',
    email: 'fernanda.souza@email.com',
    phone: '(71) 97345-6789',
    position: 'QA Analyst',
    processName: 'Quality Assurance 2024',
    status: 'IN_PROGRESS',
    appliedAt: '2024-10-28T12:00:00Z',
    updatedAt: '2024-11-09T10:30:00Z',
    score: 82,
    currentStage: 'Entrevista RH',
    avatar: 'https://i.pravatar.cc/150?img=16',
  },
];

export const useCandidates = (companyId: string) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CandidateFilters>({});
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    // Simular carregamento de dados
    const loadCandidates = async () => {
      try {
        setIsLoading(true);
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCandidates(mockCandidates);
        setFilteredCandidates(mockCandidates);
        setError(null);
      } catch (error) {
        console.error('Erro ao carregar candidatos:', error);
        setError('Erro ao carregar candidatos');
      } finally {
        setIsLoading(false);
      }
    };

    if (companyId) {
      loadCandidates();
    }
  }, [companyId]);

  useEffect(() => {
    // Aplicar filtros
    let filtered = [...candidates];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        c => c.name.toLowerCase().includes(searchLower) || c.email.toLowerCase().includes(searchLower),
      );
    }

    if (filters.status) {
      filtered = filtered.filter(c => c.status === filters.status);
    }

    if (filters.position) {
      filtered = filtered.filter(c => c.position.toLowerCase().includes(filters.position!.toLowerCase()));
    }

    if (filters.processName) {
      filtered = filtered.filter(c => c.processName.toLowerCase().includes(filters.processName!.toLowerCase()));
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(c => new Date(c.appliedAt) >= new Date(filters.dateFrom!));
    }

    if (filters.dateTo) {
      filtered = filtered.filter(c => new Date(c.appliedAt) <= new Date(filters.dateTo!));
    }

    setFilteredCandidates(filtered);
    setPage(1);
  }, [filters, candidates]);

  const paginatedCandidates = filteredCandidates.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);

  const applyFilters = (newFilters: CandidateFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
  };

  return {
    candidates: paginatedCandidates,
    allCandidates: filteredCandidates,
    isLoading,
    error,
    filters,
    page,
    totalPages,
    total: filteredCandidates.length,
    setPage,
    applyFilters,
    clearFilters,
    refetch: () => {
      setCandidates([...mockCandidates]);
      setFilteredCandidates([...mockCandidates]);
    },
  };
};
