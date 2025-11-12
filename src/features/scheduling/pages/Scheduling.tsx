import { useState } from 'react';
import { Card, CardContent, Button, Input, Badge, Avatar, AvatarFallback } from '@/shared';

import {
  Calendar,
  Search,
  Filter,
  Clock,
  MapPin,
  Video,
  Phone,
  User,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Plus,
  Download,
  Send,
  Edit,
  Briefcase,
  Mail,
  MessageSquare,
  FileText,
  Link as LinkIcon,
} from 'lucide-react';

interface Interview {
  id: string;
  candidateName: string;
  candidateAvatar: string;
  jobTitle: string;
  jobId: string;
  date: string;
  time: string;
  duration: string;
  type: 'video' | 'presencial' | 'phone';
  stage: string;
  interviewer: string;
  interviewerRole: string;
  location?: string;
  meetingLink?: string;
  status: 'confirmed' | 'pending' | 'rescheduled' | 'cancelled';
  candidateEmail: string;
  candidatePhone: string;
  notes?: string;
}

export default function Scheduling() {
  const [searchQuery, setSearchQuery] = useState('');

  const interviews: Interview[] = [
    {
      id: '1',
      candidateName: 'Ana Silva Santos',
      candidateAvatar: 'AS',
      jobTitle: 'Desenvolvedor Front-end Sênior',
      jobId: '1',
      date: '20/01/2024',
      time: '14:00',
      duration: '1h',
      type: 'video',
      stage: 'Entrevista Técnica',
      interviewer: 'Carlos Mendes',
      interviewerRole: 'Tech Lead',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      status: 'confirmed',
      candidateEmail: 'ana.silva@email.com',
      candidatePhone: '(11) 98765-4321',
      notes: 'Revisar portfólio antes da entrevista',
    },
    {
      id: '2',
      candidateName: 'Pedro Oliveira',
      candidateAvatar: 'PO',
      jobTitle: 'Designer UX/UI Pleno',
      jobId: '2',
      date: '20/01/2024',
      time: '16:00',
      duration: '45min',
      type: 'video',
      stage: 'Apresentação de Case',
      interviewer: 'Mariana Costa',
      interviewerRole: 'Head de Design',
      meetingLink: 'https://meet.google.com/xyz-abcd-efg',
      status: 'confirmed',
      candidateEmail: 'pedro.oliveira@email.com',
      candidatePhone: '(11) 91234-5678',
    },
    {
      id: '3',
      candidateName: 'Julia Rodrigues',
      candidateAvatar: 'JR',
      jobTitle: 'Gerente de Produto',
      jobId: '3',
      date: '22/01/2024',
      time: '10:00',
      duration: '1h30min',
      type: 'presencial',
      stage: 'Entrevista Final',
      interviewer: 'Roberto Silva',
      interviewerRole: 'CEO',
      location: 'Escritório - Sala 3A',
      status: 'pending',
      candidateEmail: 'julia.rodrigues@email.com',
      candidatePhone: '(11) 99876-5432',
    },
    {
      id: '4',
      candidateName: 'Lucas Martins',
      candidateAvatar: 'LM',
      jobTitle: 'Desenvolvedor Back-end',
      jobId: '5',
      date: '22/01/2024',
      time: '15:00',
      duration: '1h',
      type: 'phone',
      stage: 'Triagem Inicial',
      interviewer: 'Paula Santos',
      interviewerRole: 'Recrutadora',
      status: 'confirmed',
      candidateEmail: 'lucas.martins@email.com',
      candidatePhone: '(11) 94567-8901',
    },
    {
      id: '5',
      candidateName: 'Fernanda Lima',
      candidateAvatar: 'FL',
      jobTitle: 'Analista de Marketing',
      jobId: '4',
      date: '23/01/2024',
      time: '11:00',
      duration: '45min',
      type: 'video',
      stage: 'Entrevista com RH',
      interviewer: 'Marcos Almeida',
      interviewerRole: 'Gerente de RH',
      meetingLink: 'https://meet.google.com/mno-pqrs-tuv',
      status: 'rescheduled',
      candidateEmail: 'fernanda.lima@email.com',
      candidatePhone: '(11) 93456-7890',
    },
  ];

  const todayInterviews = interviews.filter(i => i.date === '20/01/2024');
  const upcomingInterviews = interviews.filter(i => i.date !== '20/01/2024');

  const stats = {
    total: interviews.length,
    today: todayInterviews.length,
    confirmed: interviews.filter(i => i.status === 'confirmed').length,
    pending: interviews.filter(i => i.status === 'pending').length,
  };

  const getStatusColor = (status: string) =>
    ({
      confirmed: 'bg-green-100 text-green-700 border-green-200',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      rescheduled: 'bg-blue-100 text-blue-700 border-blue-200',
      cancelled: 'bg-red-100 text-red-700 border-red-200',
    })[status] || 'bg-gray-100 text-gray-700';

  const getStatusLabel = (status: string) =>
    ({
      confirmed: 'Confirmada',
      pending: 'Pendente',
      rescheduled: 'Reagendada',
      cancelled: 'Cancelada',
    })[status] || status;

  const getTypeIcon = (type: string) => {
    const icons = { video: Video, presencial: MapPin, phone: Phone };
    return icons[type as keyof typeof icons] || Video;
  };

  const getTypeLabel = (type: string) =>
    ({
      video: 'Vídeo',
      presencial: 'Presencial',
      phone: 'Telefone',
    })[type] || type;

  return (
    <div className="min-h-screen bg-white mx-auto px-4 py-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Entrevistas Agendadas</h2>
          <p className="text-sm text-gray-600">Gerencie sua agenda de entrevistas</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Agendar Entrevista
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold mb-0.5">{stats.total}</div>
            <div className="text-xs text-gray-600">Total Agendadas</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow border-2 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-5 h-5 text-green-600" />
              <Badge className="bg-green-500 text-white text-xs">{stats.today}</Badge>
            </div>
            <div className="text-2xl font-bold mb-0.5">{stats.today}</div>
            <div className="text-xs text-gray-600">Hoje</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold mb-0.5">{stats.confirmed}</div>
            <div className="text-xs text-gray-600">Confirmadas</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold mb-0.5">{stats.pending}</div>
            <div className="text-xs text-gray-600">Pendentes</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por candidato, vaga ou entrevistador..."
                className="pl-10 h-10"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-1" />
                Data
              </Button>
              <Button variant="outline" size="sm">
                <Video className="w-4 h-4 mr-1" />
                Tipo
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-1" />
                Mais
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Interviews */}
      {todayInterviews.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-600" />
            Hoje - {todayInterviews.length} entrevista{todayInterviews.length > 1 ? 's' : ''}
          </h3>
          <div className="space-y-3">
            {todayInterviews.map(interview => {
              const TypeIcon = getTypeIcon(interview.type);
              return (
                <Card key={interview.id} className="hover:shadow-lg transition-all border-2 border-green-100">
                  <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                      {/* Left Section - Candidate Info */}
                      <div className="flex gap-3 flex-1">
                        <Avatar className="w-12 h-12 flex-shrink-0">
                          <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700 font-bold text-sm">
                            {interview.candidateAvatar}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h4 className="font-semibold text-base">{interview.candidateName}</h4>
                            <Badge variant="outline" className={getStatusColor(interview.status)}>
                              {getStatusLabel(interview.status)}
                            </Badge>
                          </div>

                          <div className="text-sm text-gray-600 mb-2">
                            <div className="flex items-center gap-1 mb-1">
                              <Briefcase className="w-3 h-3" />
                              {interview.jobTitle}
                            </div>
                            <div className="text-xs text-gray-500">{interview.stage}</div>
                          </div>

                          <div className="flex flex-wrap gap-3 text-xs">
                            <div className="flex items-center gap-1 text-gray-600">
                              <Clock className="w-3 h-3" />
                              {interview.time} • {interview.duration}
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <TypeIcon className="w-3 h-3" />
                              {getTypeLabel(interview.type)}
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <User className="w-3 h-3" />
                              {interview.interviewer}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Section - Actions */}
                      <div className="flex lg:flex-col gap-2 lg:items-end">
                        {interview.type === 'video' && interview.meetingLink && (
                          <Button size="sm" className="flex-1 lg:flex-initial bg-green-600 hover:bg-green-700">
                            <Video className="w-4 h-4 mr-1" />
                            Iniciar
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="flex-1 lg:flex-initial">
                          <Mail className="w-4 h-4 mr-1" />
                          Email
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 lg:flex-initial">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Chat
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Additional Info */}
                    {interview.notes && (
                      <div className="mt-3 pt-3 border-t">
                        <div className="flex items-start gap-2 text-xs">
                          <FileText className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-gray-700">Notas: </span>
                            <span className="text-gray-600">{interview.notes}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Meeting Link */}
                    {interview.meetingLink && (
                      <div className="mt-3 pt-3 border-t">
                        <div className="flex items-center gap-2 text-xs">
                          <LinkIcon className="w-4 h-4 text-blue-600" />
                          <a href={interview.meetingLink} className="text-blue-600 hover:underline truncate">
                            {interview.meetingLink}
                          </a>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Upcoming Interviews */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Próximas - {upcomingInterviews.length} entrevista{upcomingInterviews.length > 1 ? 's' : ''}
        </h3>
        <div className="space-y-3">
          {upcomingInterviews.map(interview => {
            const TypeIcon = getTypeIcon(interview.type);
            return (
              <Card key={interview.id} className="hover:shadow-lg transition-all border-2">
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Left Section */}
                    <div className="flex gap-3 flex-1">
                      <Avatar className="w-12 h-12 flex-shrink-0">
                        <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700 font-bold text-sm">
                          {interview.candidateAvatar}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h4 className="font-semibold text-base">{interview.candidateName}</h4>
                          <Badge variant="outline" className={getStatusColor(interview.status)}>
                            {getStatusLabel(interview.status)}
                          </Badge>
                        </div>

                        <div className="text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1 mb-1">
                            <Briefcase className="w-3 h-3" />
                            {interview.jobTitle}
                          </div>
                          <div className="text-xs text-gray-500">{interview.stage}</div>
                        </div>

                        <div className="flex flex-wrap gap-3 text-xs">
                          <div className="flex items-center gap-1 text-gray-600">
                            <Calendar className="w-3 h-3" />
                            {interview.date}
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Clock className="w-3 h-3" />
                            {interview.time} • {interview.duration}
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <TypeIcon className="w-3 h-3" />
                            {getTypeLabel(interview.type)}
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <User className="w-3 h-3" />
                            {interview.interviewer}
                          </div>
                        </div>

                        {interview.location && (
                          <div className="flex items-center gap-1 text-xs text-gray-600 mt-2">
                            <MapPin className="w-3 h-3" />
                            {interview.location}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Section - Actions */}
                    <div className="flex lg:flex-col gap-2 lg:items-end">
                      <Button size="sm" variant="outline" className="flex-1 lg:flex-initial">
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 lg:flex-initial">
                        <Send className="w-4 h-4 mr-1" />
                        Lembrar
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 lg:flex-initial">
                        <FileText className="w-4 h-4 mr-1" />
                        Perfil
                      </Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="mt-6 flex flex-wrap gap-2">
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Exportar Agenda
        </Button>
        <Button variant="outline" size="sm">
          <Send className="w-4 h-4 mr-2" />
          Enviar Lembretes
        </Button>
        <Button variant="outline" size="sm">
          <Calendar className="w-4 h-4 mr-2" />
          Sincronizar Calendário
        </Button>
      </div>
    </div>
  );
}
