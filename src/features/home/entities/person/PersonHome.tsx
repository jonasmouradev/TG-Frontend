import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Input,
  Badge,
  paths,
  useAuthCases,
} from '@/shared';
import {
  Briefcase,
  Search,
  Filter,
  MapPin,
  Bell,
  FileText,
  Send,
  CheckCircle2,
  XCircle,
  Calendar,
  DollarSign,
  Bookmark,
  Target,
  Award,
  MessageSquare,
  ArrowRight,
  Star,
  BarChart3,
} from 'lucide-react';
import { useDashboard } from '@features/home/hooks';
import { getJobLabel } from '@features/vacancyApplication/pages/VacancyApplication';
import { DateTime } from 'luxon';

export default function PersonHome() {
  const navigate = useNavigate();
  const token = useAuthCases().getDecodedToken();
  const [searchQuery, setSearchQuery] = useState('');
  const [savedJobs, setSavedJobs] = useState<string[]>(['1', '3']);

  const stats = {
    profileCompletionRate: 0,
    applications: 0,
    interviews: 0,
    savedJobs: 0,
  };

  const { publishedVacancies } = useDashboard();

  const upcomingInterviews = [
    {
      id: '1',
      company: 'Tech Solutions',
      position: 'Full Stack Developer',
      date: '30/11/2025',
      time: '14:00',
      type: 'Técnica',
      interviewer: 'Carlos Mendes',
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Product Manager',
      date: '05/12/2025',
      time: '10:00',
      type: 'RH',
      interviewer: 'Ana Silva',
    },
  ];

  // const getStatusColor = (status: string) => {
  //   const colors = {
  //     pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  //     interview: 'bg-blue-100 text-blue-700 border-blue-200',
  //     rejected: 'bg-red-100 text-red-700 border-red-200',
  //     offer: 'bg-green-100 text-green-700 border-green-200',
  //   };
  //   return colors[status as keyof typeof colors];
  // };

  // const getStatusIcon = (status: string) => {
  //   const icons = {
  //     pending: Clock,
  //     interview: MessageSquare,
  //     rejected: XCircle,
  //     offer: CheckCircle2,
  //   };
  //   const Icon = icons[status as keyof typeof icons];
  //   return Icon ? <Icon className="w-4 h-4" /> : null;
  // };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => (prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]));
  };

  const getMatchBadgeColor = (match: number) => {
    if (match >= 70) return 'bg-green-100 text-green-700';
    if (match >= 50) return 'bg-blue-100 text-blue-700';
    if (match >= 30) return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Bem-vindo de volta! </h2>
          <p className="text-sm sm:text-base text-gray-600">Encontre sua próxima oportunidade profissional</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <Card className="border-2 hover:shadow-lg transition-all">
            <CardContent className="p-4 sm:p-5 lg:p-6">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Send className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stats.applications}</div>
              <div className="text-xs sm:text-sm text-gray-600">Candidaturas</div>
              <div className="text-xs text-indigo-600 mt-1 sm:mt-2">3 pendentes</div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all">
            <CardContent className="p-4 sm:p-5 lg:p-6">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stats.interviews}</div>
              <div className="text-xs sm:text-sm text-gray-600">Entrevistas</div>
              <div className="text-xs text-green-600 mt-1 sm:mt-2">2 agendadas</div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all">
            <CardContent className="p-4 sm:p-5 lg:p-6">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Bookmark className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stats.savedJobs}</div>
              <div className="text-xs sm:text-sm text-gray-600">Vagas Salvas</div>
              <div className="text-xs text-orange-600 mt-1 sm:mt-2">Ver todas</div>
            </CardContent>
          </Card>
          <Card className="border-2 hover:shadow-lg transition-all">
            <CardContent className="p-4 sm:p-5 lg:p-6">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stats.profileCompletionRate}%</div>
              <div className="text-xs sm:text-sm text-gray-600">Taxa de Conclusão do Perfil</div>
              <div className="text-xs text-blue-600 mt-1 sm:mt-2">+12 esta semana</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Completion Alert */}
            <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardContent className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 w-full">
                    <h3 className="font-bold text-lg mb-1">Complete seu perfil</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Perfis completos possuem maior chance de serem vistos por recrutadores.
                    </p>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all"
                          style={{ width: '65%' }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 flex-shrink-0">65%</span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => navigate('/profile/complete')}
                    >
                      Completar Perfil
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Jobs */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                <div>
                  <h3 className="text-xl font-bold mb-1">Vagas Recomendadas</h3>
                  <p className="text-sm text-gray-600">Baseadas no seu perfil</p>
                </div>
                <Button variant="outline" size="sm" className="sm:w-auto">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </div>

              {/* Search Bar */}
              <div className="relative mb-5">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Buscar vagas por cargo, empresa ou palavra-chave..."
                  className="pl-12 h-12 text-sm sm:text-base"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                {publishedVacancies?.data.map(job => {
                  const applicantMatch = job.applications.find(ap => ap.applicantId === token?.profileId);
                  const matchPercentage = job
                    ? job.candidateMatches?.find(cm => cm.personId === token?.profileId)?.matchScore
                    : undefined;
                  return (
                    <Card key={job.id} className="border-2 hover:shadow-lg transition-all">
                      <CardContent className="p-4 sm:p-5 lg:p-6">
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                          {/* <Avatar className="w-12 h-12 border-2 border-gray-200 flex-shrink-0">
                          <AvatarFallback className="bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 font-bold text-sm">
                            {job.logo}
                          </AvatarFallback>
                        </Avatar> */}

                          <div className="flex-1 w-full min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                              <div className="flex-1 min-w-0">
                                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">{job.title}</h4>
                                <p className="text-sm text-gray-600 mb-2">{job.title}</p>
                              </div>
                              {matchPercentage !== undefined && (
                                <Badge
                                  className={`${getMatchBadgeColor(matchPercentage)} flex items-center gap-1 flex-shrink-0 self-start`}
                                >
                                  <Star className="w-3 h-3" />
                                  {matchPercentage}% match
                                </Badge>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600 mb-4">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                {job.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Briefcase className="w-4 h-4 flex-shrink-0" />
                                {getJobLabel(job.type)}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4 flex-shrink-0" />
                                {job.salaryMax}
                              </span>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t">
                              <div className="flex items-center gap-3 sm:gap-4 text-xs text-gray-500">
                                <span>
                                  {DateTime.fromISO(job.publicationDate ?? '').toLocaleString(DateTime.DATE_MED)}
                                </span>
                                <span>
                                  {job.applications.length === 0
                                    ? 'Nenhum candidato'
                                    : `${job.applications.length} candidatos`}{' '}
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleSaveJob(job.id)}
                                  className={savedJobs.includes(job.id) ? 'text-orange-600' : ''}
                                >
                                  <Bookmark
                                    className={`w-4 h-4 ${savedJobs.includes(job.id) ? 'fill-orange-600' : ''}`}
                                  />
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-blue-600 hover:bg-blue-700"
                                  onClick={() => navigate(paths.VACANCY_APPLICATION.replace(':id', job.id))}
                                >
                                  {applicantMatch ? 'Ver Candidatura' : 'Candidatar-se'}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Button variant="outline" className="w-full mt-5">
                Ver Mais Vagas
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Interviews */}
            <Card className="border-2">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Próximas Entrevistas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {upcomingInterviews.map(interview => (
                  <div
                    key={interview.id}
                    className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-blue-600 hover:bg-blue-600 text-white text-xs">{interview.type}</Badge>
                      <span className="text-xs text-gray-600">{interview.date}</span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{interview.position}</h4>
                    <p className="text-xs text-gray-600 mb-3">{interview.company}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">⏰ {interview.time}</span>
                      <span className="text-gray-600">👤 {interview.interviewer}</span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-2">
                  Ver Todas
                </Button>
              </CardContent>
            </Card>

            {/* Profile Score */}
            <Card className="border-2 bg-gradient-to-br from-green-50 to-teal-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Score do Perfil
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-center mb-5">
                  <div className="text-4xl font-bold text-green-600 mb-1">8.5/10</div>
                  <p className="text-sm text-gray-600">Muito bom!</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Completude</span>
                    <span className="font-semibold text-gray-900">65%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Experiências</span>
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Habilidades</span>
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Certificados</span>
                    <XCircle className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* My Applications */}
            <Card className="border-2">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Minhas Candidaturas</CardTitle>
                <CardDescription className="text-xs">Status das suas aplicações</CardDescription>
              </CardHeader>
              {/* <CardContent className="space-y-3 pt-0">
                {myApplications.slice(0, 4).map(app => (
                  <div key={app.id} className="p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate">{app.jobTitle}</h4>
                        <p className="text-xs text-gray-600 mt-0.5">{app.company}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusColor(app.status)} flex items-center gap-1 flex-shrink-0`}
                      >
                        {getStatusIcon(app.status)}
                        <span className="hidden sm:inline">{app.stage}</span>
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">Aplicado em {app.appliedDate}</p>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-2">
                  Ver Todas as Candidaturas
                </Button>
              </CardContent> */}
            </Card>

            {/* Quick Actions */}
            <Card className="border-2">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                <Button variant="outline" className="w-full justify-start text-sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Atualizar Currículo
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  <Award className="w-4 h-4 mr-2" />
                  Adicionar Certificado
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  <Bell className="w-4 h-4 mr-2" />
                  Alertas de Vagas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
