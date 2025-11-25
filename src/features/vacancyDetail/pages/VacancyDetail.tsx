import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Badge,
  Avatar,
  AvatarFallback,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  useVacancyCases,
  useApplicationCases,
  MINUTE_IN_MILLISECONDS,
} from '@/shared';

import {
  Building2,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Users,
  Eye,
  CheckCircle2,
  Download,
  Plus,
  Search,
  Filter,
  MessageSquare,
  Star,
  Phone,
  Mail,
  FileText,
  MoreVertical,
  Target,
} from 'lucide-react';
import { useParams } from 'react-router';
import { DateTime } from 'luxon';
import { getJobLabel } from '@features/home/components/ActiveVacancies';
import { ApplicationStatus } from '@core/domain';

export default function VacancyDetail() {
  const { id = '' } = useParams();
  const [selectedTab, setSelectedTab] = useState('candidates');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<ApplicationStatus | 'all'>('all');

  const { useGetVacancy } = useVacancyCases();
  const { useGetApplications } = useApplicationCases();

  const { data: { vacancy } = {} } = useGetVacancy({
    input: { id },
    staleTime: MINUTE_IN_MILLISECONDS,
  });

  const { data: { applications } = {} } = useGetApplications({
    input: { vacancyId: id, status: selectedStage === 'all' ? undefined : selectedStage },
    staleTime: MINUTE_IN_MILLISECONDS,
  });

  const stages: {
    name: ApplicationStatus | 'all';
    label: string;
    count: number | undefined;
  }[] = [
    { name: 'all', label: 'Todos', count: applications?.length },
    {
      name: 'pending',
      label: 'Pendentes',
      count: applications?.filter(c => c.status === ApplicationStatus.PENDING).length,
    },
    {
      name: 'reviewing',
      label: 'Em Análise',
      count: applications?.filter(c => c.status === ApplicationStatus.REVIEWING).length,
    },
    {
      name: 'interview',
      label: 'Entrevista',
      count: applications?.filter(c => c.status === ApplicationStatus.INTERVIEW).length,
    },
    {
      name: 'approved',
      label: 'Aprovados',
      count: applications?.filter(c => c.status === ApplicationStatus.APPROVED).length,
    },
    {
      name: 'rejected',
      label: 'Rejeitados',
      count: applications?.filter(c => c.status === ApplicationStatus.REJECTED).length,
    },
  ];

  const analytics = {
    totalViews: 234,
    totalApplications: 45,
    conversionRate: 19.2,
    avgTimeToHire: 12,
    topSources: [
      { name: 'LinkedIn', applications: 18, percentage: 40 },
      { name: 'Site Próprio', applications: 15, percentage: 33 },
      { name: 'Indicação', applications: 8, percentage: 18 },
      { name: 'Indeed', applications: 4, percentage: 9 },
    ],
    stageDistribution: [
      { stage: 'Novos', count: 12, color: 'bg-blue-500' },
      { stage: 'Análise', count: 15, color: 'bg-purple-500' },
      { stage: 'Entrevista', count: 10, color: 'bg-green-500' },
      { stage: 'Proposta', count: 5, color: 'bg-yellow-500' },
      { stage: 'Contratado', count: 3, color: 'bg-teal-500' },
    ],
  };

  const getStatusColor = (status: string) =>
    ({
      new: 'bg-blue-100 text-blue-700',
      review: 'bg-purple-100 text-purple-700',
      interview: 'bg-green-100 text-green-700',
      offer: 'bg-yellow-100 text-yellow-700',
      rejected: 'bg-red-100 text-red-700',
      hired: 'bg-teal-100 text-teal-700',
    })[status] || 'bg-gray-100 text-gray-700';

  const filteredCandidates = applications?.filter(
    candidate =>
      (selectedStage === 'all' || candidate.status === selectedStage) &&
      (searchQuery === '' ||
        candidate?.person?.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate?.person?.user?.email.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Job Header */}
        <Card className="mb-6 border-2">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold">{vacancy?.title}</h1>
                  <Badge className="bg-green-100 text-green-700">Ativa</Badge>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {vacancy?.area}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {vacancy?.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {getJobLabel(vacancy?.level || 'entry')}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {vacancy?.salaryMin}-{vacancy?.salaryMax}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Publicada em {DateTime.fromISO(vacancy?.publicationDate ?? '').toLocaleString(DateTime.DATE_MED)}
                  </span>
                </div>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-6 text-sm">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{applications?.length}</div>
                    <div className="text-xs text-gray-600">Candidatos</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{0}</div>
                    <div className="text-xs text-gray-600">Visualizações</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{0}%</div>
                    <div className="text-xs text-gray-600">Taxa de Conversão</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {DateTime.now()
                        .diff(DateTime.fromISO(vacancy?.publicationDate ?? ''), 'days')
                        .toObject()
                        .days?.toFixed(0)}
                    </div>
                    <div className="text-xs text-gray-600">Dias Aberta</div>
                  </div>
                </div>
              </div>

              <div className="flex lg:flex-col gap-2">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Candidato
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex mb-6">
            <TabsTrigger value="candidates">Candidatos ({applications?.length})</TabsTrigger>
            <TabsTrigger value="description">Descrição</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
          </TabsList>

          {/* Candidates Tab */}
          <TabsContent value="candidates" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Buscar candidatos..."
                      className="pl-10 h-10"
                      value={searchQuery}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {stages.map(stage => (
                    <Button
                      key={stage.name}
                      variant={selectedStage === stage.name ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedStage(stage.name)}
                    >
                      {stage.label} ({stage.count})
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Candidates Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-3 text-sm font-semibold text-gray-700">Candidato</th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-700 hidden md:table-cell">
                          Contato
                        </th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-700 hidden lg:table-cell">
                          Match
                        </th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-700">Status</th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-700 hidden sm:table-cell">
                          Aplicado
                        </th>
                        <th className="text-center p-3 text-sm font-semibold text-gray-700">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredCandidates?.map(candidate => (
                        <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                          {/* Candidate */}
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10 flex-shrink-0">
                                <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700 font-bold text-sm">
                                  {candidate?.person?.user.name
                                    .split(' ')
                                    .map(n => n[0])
                                    .join('')
                                    .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="min-w-0">
                                <div className="font-semibold text-sm truncate">{candidate?.person?.user.name}</div>
                                <div className="text-xs text-gray-600 truncate">
                                  {candidate?.person?.user?.address?.street} •{' '}
                                  {candidate?.person?.experiences[0]?.position}
                                </div>
                                {vacancy?.candidateMatches?.find(cm => cm.personId === candidate?.person?.id)
                                  ?.matchScore && (
                                  <div className="flex items-center gap-0.5 mt-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-3 h-3 ${
                                          i <
                                          (vacancy?.candidateMatches?.find(cm => cm.personId === candidate?.person?.id)
                                            ?.matchScore ?? 0)
                                            ? 'text-yellow-500 fill-yellow-500'
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Contact */}
                          <td className="p-3 hidden md:table-cell">
                            <div className="text-sm space-y-0.5">
                              <div className="flex items-center gap-1 text-gray-600">
                                <Mail className="w-3 h-3" />
                                <span className="truncate max-w-[200px]">{candidate?.person?.user.email}</span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-600">
                                <Phone className="w-3 h-3" />
                                <span>{candidate?.person?.user.phone?.number}</span>
                              </div>
                            </div>
                          </td>

                          {/* Match */}
                          <td className="p-3 hidden lg:table-cell">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[80px]">
                                <div
                                  className={`h-full rounded-full ${
                                    (vacancy?.candidateMatches?.find(cm => cm.personId === candidate?.person?.id)
                                      ?.matchScore ?? 0 >= 90)
                                      ? 'bg-green-500'
                                      : (vacancy?.candidateMatches?.find(cm => cm.personId === candidate?.person?.id)
                                            ?.matchScore ?? 0 >= 80)
                                        ? 'bg-blue-500'
                                        : 'bg-yellow-500'
                                  }`}
                                  style={{
                                    width: `$${
                                      vacancy?.candidateMatches?.find(cm => cm.personId === candidate?.person?.id)
                                        ?.matchScore ?? 0
                                    }%`,
                                  }}
                                />
                              </div>
                              <span className="text-sm font-semibold text-gray-700">
                                {vacancy?.candidateMatches?.find(cm => cm.personId === candidate?.person?.id)
                                  ?.matchScore ?? 0}
                                %
                              </span>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="p-3">
                            <Badge className={`${getStatusColor(candidate.status)} text-xs whitespace-nowrap`}>
                              {candidate.status}
                            </Badge>
                          </td>

                          {/* Applied Date */}
                          <td className="p-3 hidden sm:table-cell">
                            <span className="text-sm text-gray-600">{candidate.createdAt}</span>
                          </td>

                          {/* Actions */}
                          <td className="p-3">
                            <div className="flex items-center justify-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MessageSquare className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 hidden lg:inline-flex">
                                <FileText className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Empty State */}
                {filteredCandidates?.length === 0 && (
                  <div className="p-12 text-center">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Nenhum candidato encontrado</h3>
                    <p className="text-sm text-gray-600">Tente ajustar seus filtros ou aguarde novas candidaturas</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pagination/Stats */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>
                Mostrando {filteredCandidates?.length} de {applications?.length} candidatos
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Próxima
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Description Tab */}
          <TabsContent value="description">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Descrição da Vaga</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{vacancy?.description}</p>

                    <div>
                      <h3 className="font-semibold mb-2">Responsabilidades:</h3>
                      <ul className="space-y-1">
                        {vacancy?.responsibilities.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Requisitos:</h3>
                      <ul className="space-y-1">
                        {vacancy?.requirements.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <Target className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
                  <CardHeader>
                    <CardTitle className="text-base">Benefícios</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {vacancy?.benefits?.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* <Card>
                <CardHeader>
                  <CardTitle className="text-base">Fontes de Candidatos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.topSources.map((source, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{source.name}</span>
                          <span className="text-gray-600">
                            {source.applications} ({source.percentage}%)
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                            style={{ width: `${source.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card> */}

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Distribuição por Etapa</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.stageDistribution.map((stage, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span>{stage.stage}</span>
                            <span className="font-semibold">{stage.count}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
