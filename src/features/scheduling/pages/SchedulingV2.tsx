import React, { useState } from 'react';
import { Card, CardContent, Button, Badge, Avatar, AvatarFallback } from '@/shared';

import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Building2,
  Bell,
  Settings,
  Clock,
  Video,
  MapPin,
  User,
  Plus,
  Phone,
  Mail,
  FileText,
  ArrowLeft,
  X,
  MessageSquare,
} from 'lucide-react';

interface Interview {
  id: string;
  candidateName: string;
  candidateAvatar: string;
  jobTitle: string;
  department: string;
  date: string;
  time: string;
  duration: string;
  type: 'presencial' | 'video' | 'telefone';
  stage: string;
  interviewer: string;
  location?: string;
  meetingLink?: string;
  status: 'scheduled' | 'confirmed' | 'pending';
  notes?: string;
}

export default function SchedulingV2() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 20)); // Jan 20, 2024
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  // const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  const interviews: Interview[] = [
    {
      id: '1',
      candidateName: 'Ana Silva Santos',
      candidateAvatar: 'AS',
      jobTitle: 'Desenvolvedor Front-end Sênior',
      department: 'Tecnologia',
      date: '2024-01-20',
      time: '14:00',
      duration: '1h',
      type: 'video',
      stage: 'Entrevista Técnica',
      interviewer: 'Carlos Mendes',
      meetingLink: 'meet.google.com/abc-defg-hij',
      status: 'confirmed',
      notes: 'Candidato com ótimo portfólio. Revisar projetos em React.',
    },
    {
      id: '2',
      candidateName: 'Pedro Oliveira',
      candidateAvatar: 'PO',
      jobTitle: 'Designer UX/UI Pleno',
      department: 'Design',
      date: '2024-01-20',
      time: '10:30',
      duration: '45min',
      type: 'video',
      stage: 'Apresentação de Case',
      interviewer: 'Maria Santos',
      status: 'confirmed',
    },
    {
      id: '3',
      candidateName: 'Juliana Ferreira',
      candidateAvatar: 'JF',
      jobTitle: 'Product Manager',
      department: 'Produto',
      date: '2024-01-20',
      time: '16:30',
      duration: '1h',
      type: 'presencial',
      stage: 'Entrevista Diretoria',
      interviewer: 'Roberto Lima',
      location: 'Sala 301',
      status: 'pending',
    },
    {
      id: '4',
      candidateName: 'Lucas Rodrigues',
      candidateAvatar: 'LR',
      jobTitle: 'Desenvolvedor Back-end',
      department: 'Tecnologia',
      date: '2024-01-22',
      time: '09:00',
      duration: '1h',
      type: 'video',
      stage: 'Entrevista Técnica',
      interviewer: 'Ana Paula',
      status: 'scheduled',
    },
    {
      id: '5',
      candidateName: 'Mariana Costa',
      candidateAvatar: 'MC',
      jobTitle: 'Analista de Marketing',
      department: 'Marketing',
      date: '2024-01-23',
      time: '11:00',
      duration: '30min',
      type: 'telefone',
      stage: 'Triagem Inicial',
      interviewer: 'Fernando Silva',
      status: 'scheduled',
    },
    {
      id: '6',
      candidateName: 'Ricardo Santos',
      candidateAvatar: 'RS',
      jobTitle: 'Developer Full Stack',
      department: 'Tecnologia',
      date: '2024-01-25',
      time: '15:00',
      duration: '1h',
      type: 'video',
      stage: 'Entrevista Técnica',
      interviewer: 'Carlos Mendes',
      status: 'confirmed',
    },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getInterviewsForDate = (date: string) => {
    return interviews.filter(i => i.date === date);
  };

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const getTypeColor = (type: string) =>
    ({
      video: 'bg-blue-500',
      presencial: 'bg-green-500',
      telefone: 'bg-purple-500',
    })[type] || 'bg-gray-500';

  const getTypeIcon = (type: string) => {
    const icons = { video: Video, presencial: MapPin, telefone: Phone };
    return icons[type as keyof typeof icons] || Video;
  };

  const getStatusColor = (status: string) =>
    ({
      scheduled: 'border-blue-500',
      confirmed: 'border-green-500',
      pending: 'border-yellow-500',
    })[status] || 'border-gray-500';

  const isToday = (day: number) => {
    const today = new Date(2024, 0, 20); // Simulated today
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                <p className="text-xs text-gray-500">Entrevistas</p>
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

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="border-2">
              <CardContent className="p-4">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">
                    {monthNames[month]} {year}
                  </h2>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-0">
                      <Plus className="w-4 h-4 mr-1" />
                      Nova
                    </Button>
                    <div className="flex gap-1">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={prevMonth}>
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={nextMonth}>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Day Names */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {dayNames.map(day => (
                    <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {/* Empty cells before month starts */}
                  {Array.from({ length: startingDayOfWeek }).map((_, idx) => (
                    <div key={`empty-${idx}`} className="aspect-square" />
                  ))}

                  {/* Days of month */}
                  {Array.from({ length: daysInMonth }).map((_, idx) => {
                    const day = idx + 1;
                    const dateKey = formatDateKey(year, month, day);
                    const dayInterviews = getInterviewsForDate(dateKey);
                    const today = isToday(day);

                    return (
                      <div
                        key={day}
                        className={`aspect-square border-2 rounded-lg p-1 transition-all hover:shadow-md cursor-pointer ${
                          today ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className={`text-sm font-semibold mb-1 ${today ? 'text-blue-600' : 'text-gray-900'}`}>
                          {day}
                        </div>
                        <div className="space-y-0.5">
                          {dayInterviews.slice(0, 2).map(interview => (
                            <div
                              key={interview.id}
                              onClick={() => setSelectedInterview(interview)}
                              className={`text-xs px-1 py-0.5 rounded border-l-2 ${getStatusColor(interview.status)} bg-gray-50 hover:bg-gray-100 truncate cursor-pointer`}
                            >
                              <div className="flex items-center gap-1">
                                <div className={`w-1.5 h-1.5 rounded-full ${getTypeColor(interview.type)}`} />
                                <span className="font-medium">{interview.time}</span>
                              </div>
                              <div className="truncate text-gray-600">{interview.candidateName.split(' ')[0]}</div>
                            </div>
                          ))}
                          {dayInterviews.length > 2 && (
                            <div className="text-xs text-blue-600 font-semibold px-1">
                              +{dayInterviews.length - 2} mais
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span>Videochamada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span>Presencial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                    <span>Telefone</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Today's Schedule & Selected Interview */}
          <div className="space-y-4">
            {/* Selected Interview Detail */}
            {selectedInterview ? (
              <Card className="border-2 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold">Detalhes da Entrevista</h3>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSelectedInterview(null)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700 font-bold">
                          {selectedInterview.candidateAvatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{selectedInterview.candidateName}</h4>
                        <p className="text-xs text-gray-600">{selectedInterview.jobTitle}</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>
                          {selectedInterview.time} - {selectedInterview.duration}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {React.createElement(getTypeIcon(selectedInterview.type), {
                          className: 'w-4 h-4 text-gray-400',
                        })}
                        <span className="capitalize">{selectedInterview.type}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>{selectedInterview.interviewer}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-gray-400" />
                        <Badge className="text-xs">{selectedInterview.stage}</Badge>
                      </div>
                    </div>

                    {selectedInterview.meetingLink && (
                      <div className="p-2 bg-blue-50 rounded text-xs">
                        <a
                          href={`https://${selectedInterview.meetingLink}`}
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <Video className="w-3 h-3" />
                          {selectedInterview.meetingLink}
                        </a>
                      </div>
                    )}

                    {selectedInterview.location && (
                      <div className="p-2 bg-green-50 rounded text-xs flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-green-600" />
                        <span>{selectedInterview.location}</span>
                      </div>
                    )}

                    {selectedInterview.notes && (
                      <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
                        <strong>Notas:</strong> {selectedInterview.notes}
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Mail className="w-3 h-3 mr-1" />
                        Email
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <FileText className="w-3 h-3 mr-1" />
                        CV
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-2">
                <CardContent className="p-4">
                  <h3 className="font-bold mb-3">Hoje - 20 de Janeiro</h3>
                  <div className="space-y-2">
                    {getInterviewsForDate('2024-01-20').length > 0 ? (
                      getInterviewsForDate('2024-01-20').map(interview => (
                        <div
                          key={interview.id}
                          onClick={() => setSelectedInterview(interview)}
                          className="p-3 border-2 rounded-lg hover:border-blue-500 cursor-pointer transition-all"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`w-2 h-2 rounded-full ${getTypeColor(interview.type)}`} />
                            <span className="font-semibold text-sm">{interview.time}</span>
                            <span className="text-xs text-gray-600">{interview.duration}</span>
                          </div>
                          <div className="text-sm font-medium">{interview.candidateName}</div>
                          <div className="text-xs text-gray-600">{interview.jobTitle}</div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Nenhuma entrevista hoje</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
              <CardContent className="p-4">
                <h3 className="font-bold mb-3 text-sm">Estatísticas</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Este mês</span>
                    <span className="font-bold">{interviews.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Confirmadas</span>
                    <span className="font-bold text-green-600">
                      {interviews.filter(i => i.status === 'confirmed').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pendentes</span>
                    <span className="font-bold text-yellow-600">
                      {interviews.filter(i => i.status === 'pending').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
