import { useState } from 'react';
import { Card, CardContent, Button, Input, Badge, Avatar, AvatarFallback } from '@/shared';
import {
  Briefcase,
  Search,
  Filter,
  MapPin,
  Building2,
  Bell,
  Settings,
  Users,
  Clock,
  MoreVertical,
  Eye,
  Edit,
  Copy,
  Archive,
  Plus,
  TrendingUp,
  Calendar,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Download,
  ArrowLeft,
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  status: 'active' | 'draft' | 'paused';
  candidates: number;
  newCandidates: number;
  interviews: number;
  daysOpen: number;
  views: number;
  applicationsRate: number;
  createdAt: string;
  salary?: string;
}

export default function ActiveVacancies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const jobs: Job[] = [
    {
      id: '1',
      title: 'Desenvolvedor Front-end Sênior',
      department: 'Tecnologia',
      location: 'São Paulo, SP',
      type: 'CLT',
      status: 'active',
      candidates: 45,
      newCandidates: 12,
      interviews: 8,
      daysOpen: 5,
      views: 234,
      applicationsRate: 19.2,
      createdAt: '15/01/2024',
      salary: 'R$ 10.000 - R$ 14.000',
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
      interviews: 5,
      daysOpen: 12,
      views: 189,
      applicationsRate: 16.9,
      createdAt: '10/01/2024',
      salary: 'R$ 8.000 - R$ 12.000',
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
      interviews: 3,
      daysOpen: 8,
      views: 156,
      applicationsRate: 17.9,
      createdAt: '12/01/2024',
      salary: 'R$ 12.000 - R$ 18.000',
    },
    {
      id: '4',
      title: 'Analista de Marketing Digital',
      department: 'Marketing',
      location: 'Híbrido - SP',
      type: 'CLT',
      status: 'paused',
      candidates: 18,
      newCandidates: 0,
      interviews: 2,
      daysOpen: 15,
      views: 98,
      applicationsRate: 18.4,
      createdAt: '08/01/2024',
    },
    {
      id: '5',
      title: 'Desenvolvedor Back-end',
      department: 'Tecnologia',
      location: 'Remoto',
      type: 'PJ',
      status: 'active',
      candidates: 52,
      newCandidates: 15,
      interviews: 10,
      daysOpen: 3,
      views: 312,
      applicationsRate: 16.7,
      createdAt: '17/01/2024',
      salary: 'R$ 12.000 - R$ 16.000',
    },
  ];

  const stats = {
    totalJobs: jobs.length,
    activeJobs: jobs.filter(j => j.status === 'active').length,
    totalCandidates: jobs.reduce((acc, j) => acc + j.candidates, 0),
    avgApplicationsRate: (jobs.reduce((acc, j) => acc + j.applicationsRate, 0) / jobs.length).toFixed(1),
  };

  const getStatusColor = (status: string) =>
    ({
      active: 'bg-green-100 text-green-700 border-green-200',
      draft: 'bg-gray-100 text-gray-700 border-gray-200',
      paused: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    })[status] || 'bg-gray-100 text-gray-700';

  const getStatusLabel = (status: string) =>
    ({
      active: 'Ativa',
      draft: 'Rascunho',
      paused: 'Pausada',
    })[status] || status;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-sm">TechCorp</h1>
                <p className="text-xs text-gray-500">Vagas Ativas</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative h-8 w-8">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="w-4 h-4" />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">TC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="w-screen max-w-7xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex  flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Vagas Ativas</h2>
            <p className="text-sm text-gray-600">Gerencie e acompanhe suas vagas abertas</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Nova Vaga
          </Button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-2xl font-bold mb-0.5">{stats.totalJobs}</div>
              <div className="text-xs text-gray-600">Total de Vagas</div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <Badge className="bg-green-100 text-green-700 text-xs">{stats.activeJobs}</Badge>
              </div>
              <div className="text-2xl font-bold mb-0.5">{stats.activeJobs}</div>
              <div className="text-xs text-gray-600">Vagas Ativas</div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-5 h-5 text-purple-600" />
                <Badge className="bg-purple-100 text-purple-700 text-xs">+34</Badge>
              </div>
              <div className="text-2xl font-bold mb-0.5">{stats.totalCandidates}</div>
              <div className="text-xs text-gray-600">Candidatos</div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <BarChart3 className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-2xl font-bold mb-0.5">{stats.avgApplicationsRate}%</div>
              <div className="text-xs text-gray-600">Taxa Média</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar por título, departamento ou localização..."
                  className="pl-10 h-10"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('all')}
                >
                  Todas
                </Button>
                <Button
                  variant={selectedFilter === 'active' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('active')}
                >
                  Ativas
                </Button>
                <Button
                  variant={selectedFilter === 'paused' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('paused')}
                >
                  Pausadas
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-1" />
                  Mais
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jobs List */}
        <div className="space-y-3">
          {jobs
            .filter(job => selectedFilter === 'all' || job.status === selectedFilter)
            .filter(
              job =>
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .map(job => (
              <Card key={job.id} className="hover:shadow-lg transition-all border-2">
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Job Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-base font-semibold">{job.title}</h3>
                        <Badge variant="outline" className={getStatusColor(job.status)}>
                          {getStatusLabel(job.status)}
                        </Badge>
                        {job.newCandidates > 0 && (
                          <Badge className="bg-red-500 text-white text-xs">{job.newCandidates} novos</Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3 h-3" />
                          {job.type}
                        </span>
                        {job.salary && (
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            {job.salary}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {job.createdAt}
                        </span>
                      </div>

                      {/* Metrics */}
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-xs">
                            <Users className="w-4 h-4 text-purple-600" />
                            <span className="font-semibold text-gray-900">{job.candidates}</span>
                            <span className="text-gray-600">candidatos</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-xs">
                          <Eye className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-gray-900">{job.views}</span>
                          <span className="text-gray-600">visualizações</span>
                        </div>

                        <div className="flex items-center gap-1 text-xs">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="font-semibold text-gray-900">{job.interviews}</span>
                          <span className="text-gray-600">entrevistas</span>
                        </div>

                        <div className="flex items-center gap-1 text-xs">
                          <Clock className="w-4 h-4 text-orange-600" />
                          <span className="font-semibold text-gray-900">{job.daysOpen}</span>
                          <span className="text-gray-600">dias aberta</span>
                        </div>

                        <div className="flex items-center gap-1 text-xs">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="font-semibold text-gray-900">{job.applicationsRate}%</span>
                          <span className="text-gray-600">taxa</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2 lg:items-end">
                      <Button size="sm" variant="outline" className="flex-1 lg:flex-initial">
                        <Eye className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">Ver</span>
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 lg:flex-initial">
                        <Edit className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">Editar</span>
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 lg:flex-initial">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">Stats</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {job.status === 'active' && (
                    <div className="mt-4 pt-3 border-t">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-gray-600">Funil de Conversão</span>
                        <span className="font-semibold text-gray-900">
                          {((job.interviews / job.candidates) * 100).toFixed(0)}% para entrevista
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 transition-all"
                          style={{ width: `${(job.interviews / job.candidates) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Empty State */}
        {jobs.filter(job => selectedFilter === 'all' || job.status === selectedFilter).length === 0 && (
          <Card className="p-12 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma vaga encontrada</h3>
            <p className="text-sm text-gray-600 mb-4">Tente ajustar seus filtros ou criar uma nova vaga</p>
            <Button className="bg-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Criar Nova Vaga
            </Button>
          </Card>
        )}

        {/* Bulk Actions */}
        <div className="mt-6 flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar Relatório
          </Button>
          <Button variant="outline" size="sm">
            <Copy className="w-4 h-4 mr-2" />
            Duplicar Selecionadas
          </Button>
          <Button variant="outline" size="sm">
            <Archive className="w-4 h-4 mr-2" />
            Arquivar
          </Button>
        </div>
      </div>
    </div>
  );
}
