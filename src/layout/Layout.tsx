import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/navbar';

const Layout = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/cadastro'];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Outlet />
    </>
  );
};

export default Layout;
