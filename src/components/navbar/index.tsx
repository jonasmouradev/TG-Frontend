import { useUserContext } from '@/contexts/UserContext';
import logoutIcon from '../../assets/logout.svg';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const user = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  return (
    <>
      {user.id && (
        <nav className="w-screen h-16 bg-slate-900 text-white">
          <ul className="h-full flex justify-around items-center">
            <li>
              <a onClick={() => handleNavigation('/home')}>Home</a>
            </li>
            <li>
              <a onClick={() => handleNavigation('/configs')}>Configs</a>
            </li>
            <li>
              <a onClick={() => handleNavigation('/profile')}>{user.name}</a>
            </li>
            <li>
              <a onClick={() => handleNavigation('/')}>
                <img src={logoutIcon} />
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
