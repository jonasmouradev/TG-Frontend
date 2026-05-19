import { Button } from '@/shared';
import { RefreshCw } from 'lucide-react';
import { useDashboard } from '../../hooks';
import WelcomeSection from '../../components/WelcomeSection';
import StatsCards from '../../components/StatsCards';
import ActiveVacancies from '../../components/ActiveVacancies';
import HomeSidebar from '../../components/HomeSidebar';

export default function CompanyHome() {
  const { stats, recentJobs, error, refreshData } = useDashboard();

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

  const dashboardStats = stats || {
    activeJobs: 0,
    candidatesToday: 0,
    avgProcessTime: 0,
    satisfaction: 0,
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <WelcomeSection />
        <StatsCards dashboardStats={dashboardStats} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <ActiveVacancies recentJobs={recentJobs} onRefresh={refreshData} />
          <HomeSidebar dashboardStats={dashboardStats} />
        </div>
      </div>
    </div>
  );
}
