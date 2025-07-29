import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '@/shared/components/layout/Sidebar';
import { paths } from '@/shared/utils/constants';

const Layout = () => {
  const location = useLocation();
  const hideSidebarRoutes: string[] = [paths.SIGN_UP, paths.SIGN_IN];

  return (
    <div className="flex flex-col lg:flex-row lg:w-screen">
      {!hideSidebarRoutes.includes(location.pathname) && <Sidebar />}
      <Outlet />
    </div>
  );
};

export default Layout;
