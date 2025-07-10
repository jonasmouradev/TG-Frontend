import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/shared/components/layout/Navbar';

const Layout = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/cadastro', '/', '/signUp'];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Outlet />
    </>
  );
};

export default Layout;
