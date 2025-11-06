import QuickStats from './QuickStats';
import { Candidate } from '@features/home/hooks/useDashboard';
import RecentCandidates from './RecentCandidates';
import QuickActions from './QuickActions';

const HomeSidebar = ({ dashboardStats, recentCandidates }: { dashboardStats: any; recentCandidates: Candidate[] }) => {
  return (
    <div className="space-y-6">
      <QuickStats dashboardStats={dashboardStats} />
      <RecentCandidates recentCandidates={recentCandidates} />
      <QuickActions />
    </div>
  );
};

export default HomeSidebar;
