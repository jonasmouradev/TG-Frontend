import { Badge, Card, CardContent } from '@/shared';
import { Briefcase, TrendingUp, Users, UserCheck, CheckCircle2, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router';

const StatsCards = ({ dashboardStats }: { dashboardStats: any }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <Card
        className="border-2 hover:shadow-lg transition-all cursor-pointer"
        onClick={() => navigate('/vacancies/active')}
      >
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

      <Card
        className="border-2 hover:shadow-lg transition-all cursor-pointer"
        onClick={() => navigate('/candidates/registration')}
      >
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

      <Card
        className="border-2 hover:shadow-lg transition-all cursor-pointer"
        onClick={() => navigate('/vacancies/scheduling')}
      >
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
  );
};

export default StatsCards;
