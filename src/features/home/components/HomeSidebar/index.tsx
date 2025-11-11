import QuickStats from './QuickStats';
import QuickActions from './QuickActions';

const HomeSidebar = ({ dashboardStats }: { dashboardStats: any }) => {
  return (
    <div className="space-y-6">
      <QuickStats dashboardStats={dashboardStats} />
      {/* <RecentCandidates recentCandidates={recentCandidates} /> */}
      <QuickActions />
    </div>
  );
};

export default HomeSidebar;
