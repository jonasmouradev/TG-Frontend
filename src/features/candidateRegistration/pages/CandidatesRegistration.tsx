import { useState } from 'react';
import { useCandidates } from '../hooks';
import {
  Users,
  Filter,
  Search,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  X,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  UserX,
  Clock,
  Award,
} from 'lucide-react';
import { Candidate, CandidateFilters, statusColors, statusLabels, statusOptions } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// TODO: Substituir por ID real da empresa do contexto/auth
const COMPANY_ID = 'company-123';

const CandidateRegistration = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [localFilters, setLocalFilters] = useState<CandidateFilters>({});

  const { candidates, allCandidates, isLoading, error, page, totalPages, setPage, applyFilters, clearFilters } =
    useCandidates(COMPANY_ID);

  const handleApplyFilters = () => {
    applyFilters(localFilters);
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setLocalFilters({});
    clearFilters();
  };

  const getStatusStats = () => {
    const stats = {
      total: allCandidates.length,
      active: allCandidates.filter(c => c.status === 'ACTIVE').length,
      inProgress: allCandidates.filter(c => c.status === 'IN_PROGRESS').length,
      approved: allCandidates.filter(c => c.status === 'APPROVED').length,
      rejected: allCandidates.filter(c => c.status === 'REJECTED').length,
    };
    return stats;
  };

  const stats = getStatusStats();

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg border border-red-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserX className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-red-600 mb-2">Erro ao carregar candidatos</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Candidatos</h1>
              <p className="text-muted-foreground">Gerencie todos os candidatos dos processos seletivos</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Total</p>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Ativos</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
                </div>
                <UserCheck className="h-8 w-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Em Processo</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Aprovados</p>
                  <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                </div>
                <Award className="h-8 w-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Rejeitados</p>
                  <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                </div>
                <UserX className="h-8 w-8 text-red-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-border shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por nome ou email..."
                value={localFilters.search || ''}
                onChange={e => {
                  const newFilters = { ...localFilters, search: e.target.value };
                  setLocalFilters(newFilters);
                  applyFilters(newFilters);
                }}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                showFilters ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80 text-foreground'
              }`}
            >
              <Filter className="h-4 w-4" />
              Filtros
              {Object.keys(localFilters).filter(k => k !== 'search' && localFilters[k as keyof CandidateFilters])
                .length > 0 && (
                <span className="bg-primary-foreground text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {
                    Object.keys(localFilters).filter(k => k !== 'search' && localFilters[k as keyof CandidateFilters])
                      .length
                  }
                </span>
              )}
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="filter-status" className="block text-sm font-medium text-foreground mb-2">
                    Status
                  </label>
                  <select
                    id="filter-status"
                    value={localFilters.status || ''}
                    onChange={e =>
                      setLocalFilters({
                        ...localFilters,
                        status: (e.target.value as any) || undefined,
                      })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  >
                    <option value="">Todos</option>
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="filter-position" className="block text-sm font-medium text-foreground mb-2">
                    Vaga
                  </label>
                  <input
                    id="filter-position"
                    type="text"
                    placeholder="Ex: Desenvolvedor"
                    value={localFilters.position || ''}
                    onChange={e => setLocalFilters({ ...localFilters, position: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  />
                </div>

                <div>
                  <label htmlFor="filter-process" className="block text-sm font-medium text-foreground mb-2">
                    Processo
                  </label>
                  <input
                    id="filter-process"
                    type="text"
                    placeholder="Ex: Tech 2024"
                    value={localFilters.processName || ''}
                    onChange={e => setLocalFilters({ ...localFilters, processName: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  />
                </div>

                <div>
                  <label htmlFor="filter-date-from" className="block text-sm font-medium text-foreground mb-2">
                    Data Inicial
                  </label>
                  <input
                    id="filter-date-from"
                    type="date"
                    value={localFilters.dateFrom || ''}
                    onChange={e => setLocalFilters({ ...localFilters, dateFrom: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  />
                </div>

                <div>
                  <label htmlFor="filter-date-to" className="block text-sm font-medium text-foreground mb-2">
                    Data Final
                  </label>
                  <input
                    id="filter-date-to"
                    type="date"
                    value={localFilters.dateTo || ''}
                    onChange={e => setLocalFilters({ ...localFilters, dateTo: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleApplyFilters}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Aplicar Filtros
                </button>
                <button
                  onClick={handleClearFilters}
                  className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors"
                >
                  Limpar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Candidates Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Carregando candidatos...</p>
            </div>
          </div>
        ) : null}

        {!isLoading && candidates.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-border p-12 text-center">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">Nenhum candidato encontrado com os filtros aplicados.</p>
          </div>
        ) : null}

        {!isLoading && candidates.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {candidates.map(candidate => (
                <button
                  key={candidate.id}
                  type="button"
                  onClick={() => setSelectedCandidate(candidate)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedCandidate(candidate);
                    }
                  }}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-border p-6 hover:shadow-lg transition-all cursor-pointer group text-left w-full"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      {candidate.avatar ? (
                        <img
                          src={candidate.avatar}
                          alt={candidate.name}
                          className="h-14 w-14 rounded-full object-cover ring-2 ring-border"
                        />
                      ) : (
                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-lg ring-2 ring-border">
                          {candidate.name.charAt(0)}
                        </div>
                      )}
                      <div
                        className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white dark:border-gray-800 ${
                          candidate.status === 'ACTIVE' || candidate.status === 'IN_PROGRESS'
                            ? 'bg-green-500'
                            : 'bg-gray-400'
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-foreground truncate group-hover:text-primary transition-colors">
                        {candidate.name}
                      </h3>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                          statusColors[candidate.status]
                        }`}
                      >
                        {statusLabels[candidate.status]}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{candidate.email}</span>
                    </div>

                    {candidate.phone && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        <span>{candidate.phone}</span>
                      </div>
                    )}

                    <div className="pt-3 border-t border-border space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-medium text-foreground">Vaga:</span>
                        <span className="text-xs text-muted-foreground flex-1">{candidate.position}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-medium text-foreground">Processo:</span>
                        <span className="text-xs text-muted-foreground flex-1">{candidate.processName}</span>
                      </div>
                      {candidate.currentStage && (
                        <div className="flex items-start gap-2">
                          <span className="text-xs font-medium text-foreground">Etapa:</span>
                          <span className="text-xs text-muted-foreground flex-1">{candidate.currentStage}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDistanceToNow(new Date(candidate.appliedAt), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </div>
                      {candidate.score && (
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3 text-green-500" />
                          <span className="text-xs font-semibold text-foreground">{candidate.score}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={`page-${i + 1}`}
                      onClick={() => setPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        page === i + 1
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80 text-foreground'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </>
        ) : null}
      </div>

      {/* Modal de Detalhes */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-border p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-foreground">Detalhes do Candidato</h2>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-start gap-6">
                {selectedCandidate.avatar ? (
                  <img
                    src={selectedCandidate.avatar}
                    alt={selectedCandidate.name}
                    className="h-24 w-24 rounded-2xl object-cover ring-4 ring-border"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-3xl ring-4 ring-border">
                    {selectedCandidate.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{selectedCandidate.name}</h3>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      statusColors[selectedCandidate.status]
                    }`}
                  >
                    {statusLabels[selectedCandidate.status]}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">Email</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{selectedCandidate.email}</p>
                </div>

                {selectedCandidate.phone && (
                  <div className="bg-muted/50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground">Telefone</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{selectedCandidate.phone}</p>
                  </div>
                )}

                <div className="bg-muted/50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">Vaga</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{selectedCandidate.position}</p>
                </div>

                <div className="bg-muted/50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">Processo</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{selectedCandidate.processName}</p>
                </div>

                {selectedCandidate.currentStage && (
                  <div className="bg-muted/50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground">Etapa Atual</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{selectedCandidate.currentStage}</p>
                  </div>
                )}

                {selectedCandidate.score && (
                  <div className="bg-muted/50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground">Pontuação</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{selectedCandidate.score}%</p>
                  </div>
                )}

                <div className="bg-muted/50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">Candidatura</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(selectedCandidate.appliedAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>

                <div className="bg-muted/50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">Última Atualização</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(selectedCandidate.updatedAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors">
                  Enviar Email
                </button>
                <button className="flex-1 px-4 py-3 bg-muted text-foreground rounded-xl font-medium hover:bg-muted/80 transition-colors">
                  Ver Currículo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateRegistration;
