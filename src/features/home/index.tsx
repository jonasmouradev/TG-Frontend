import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Badge,
  Input,
  Button,
  Avatar,
  AvatarFallback,
} from '@/shared';
import {
  Briefcase,
  Users,
  TrendingUp,
  Clock,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  MapPin,
  Calendar,
  CheckCircle2,
  BarChart3,
  UserCheck,
  Building2,
  Bell,
  Settings,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { useDashboard } from './hooks';

export default function CompanyDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { stats, recentJobs, recentCandidates, isLoading, error, refreshData } = useDashboard();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Carregando dashboard...</span>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erro ao carregar dashboard: {error}</p>
          <Button onClick={refreshData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Tentar Novamente
          </Button>
        </div>
      </div>
    );
  }

  // Use fallback data if stats is null
  const dashboardStats = stats || {
    activeJobs: 0,
    totalCandidates: 0,
    newApplications: 0,
    scheduledInterviews: 0,
    conversionRate: 0,
    avgProcessTime: 0,
    satisfaction: 0,
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-700 border-green-200',
      draft: 'bg-gray-100 text-gray-700 border-gray-200',
      closed: 'bg-red-100 text-red-700 border-red-200',
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      active: 'Ativa',
      draft: 'Rascunho',
      closed: 'Fechada',
    };
    return labels[status as keyof typeof labels];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">TechCorp</h1>
                <p className="text-xs text-gray-500">Painel de Recrutamento</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Avatar className="w-9 h-9 border-2 border-blue-200">
                <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">TC</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Bem-vindo de volta! 👋</h2>
          <p className="text-sm sm:text-base text-gray-600">Aqui está um resumo das suas atividades de recrutamento</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="border-2 hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{dashboardStats.activeJobs}</div>
              <div className="text-sm text-gray-600">Vagas Ativas</div>
              <div className="text-xs text-green-600 mt-2">+3 esta semana</div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  {dashboardStats.newApplications} novos
                </Badge>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{dashboardStats.totalCandidates}</div>
              <div className="text-sm text-gray-600">Total de Candidatos</div>
              <div className="text-xs text-purple-600 mt-2">+{dashboardStats.newApplications} hoje</div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-green-600" />
                </div>
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">18</div>
              <div className="text-sm text-gray-600">Em Processo Final</div>
              <div className="text-xs text-green-600 mt-2">6 propostas enviadas</div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{dashboardStats.scheduledInterviews}</div>
              <div className="text-sm text-gray-600">Entrevistas Agendadas</div>
              <div className="text-xs text-orange-600 mt-2">3 para hoje</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Vagas Ativas */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold mb-1">Vagas Abertas</h3>
                <p className="text-sm text-gray-600">
                  {(recentJobs || []).filter(j => j.status === 'active').length} vagas publicadas
                </p>
              </div>
              <Button
                onClick={() => navigate('/vacancies/new')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova Vaga
              </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar vagas..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="sm:w-auto">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>

            {/* Jobs List */}
            <div className="space-y-3">
              {(recentJobs || []).map(job => (
                <Card key={job.id} className="hover:shadow-lg transition-all border-2">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h4 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{job.title}</h4>
                          <Badge variant="outline" className={getStatusColor(job.status)}>
                            {getStatusLabel(job.status)}
                          </Badge>
                          {job.newCandidates > 0 && (
                            <Badge className="bg-red-500 text-white">{job.newCandidates} novos</Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.daysOpen} dias aberta
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="flex-shrink-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="font-semibold text-gray-900">{job.candidates}</span>
                          <span className="text-gray-600">candidatos</span>
                        </div>
                        {job.status === 'active' && (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="font-semibold">Recebendo</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 sm:mr-2" />
                          <span className="hidden sm:inline">Ver</span>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 sm:mr-2" />
                          <span className="hidden sm:inline">Editar</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button variant="outline" className="w-full">
              Ver Todas as Vagas
            </Button>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="w-5 h-5" />
                  Resumo Rápido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">Taxa de Conversão</div>
                    <div className="text-xl font-bold text-blue-600">{dashboardStats.conversionRate}%</div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">Tempo Médio</div>
                    <div className="text-xl font-bold text-green-600">{dashboardStats.avgProcessTime} dias</div>
                  </div>
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">Satisfação</div>
                    <div className="text-xl font-bold text-purple-600">{dashboardStats.satisfaction}/5</div>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Candidates */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Candidatos Recentes</CardTitle>
                <CardDescription>Últimas candidaturas recebidas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {(recentCandidates || []).map(candidate => (
                  <div
                    key={candidate.id}
                    className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Avatar className="w-10 h-10 border-2 border-blue-200">
                      <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold text-sm">
                        {candidate.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-gray-900 truncate">{candidate.name}</div>
                      <div className="text-xs text-gray-600 truncate">{candidate.job}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {candidate.stage}
                        </Badge>
                        <span className="text-xs text-gray-500">{candidate.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full text-sm">
                  Ver Todos os Candidatos
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-2 bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Nova Vaga
                </Button>
                <Button variant="outline" className="w-full justify-start bg-white">
                  <Users className="w-4 h-4 mr-2" />
                  Buscar Candidatos
                </Button>
                <Button variant="outline" className="w-full justify-start bg-white">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Ver Relatórios
                </Button>
                <Button variant="outline" className="w-full justify-start bg-white">
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
