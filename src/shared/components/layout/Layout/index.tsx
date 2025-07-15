import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/shared/components/layout/Navbar';
import { paths } from '@/shared/utils/constants';

const Layout = () => {
  const location = useLocation();
  const hideNavbarRoutes: string[] = [paths.SIGN_UP, paths.SIGN_IN];

  return (
    <div className="flex w-screen">
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Outlet />
    </div>
  );
};

export default Layout;
