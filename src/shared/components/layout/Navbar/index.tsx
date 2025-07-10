import useUserContext from '@/shared/contexts/UserContext';
import { House, Activity, Search, NotebookText, Settings } from 'lucide-react';
import { ElementType } from 'react';
import { useLocation, useNavigate } from 'react-router';

const Navbar = () => {
  const user = useUserContext();

  const handleNavigation = (path: string) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  const navigateList: { label: string; path: string; icon: ElementType }[] = [
    {
      label: 'Home',
      path: '/home',
      icon: House,
    },
    {
      label: 'Atividade',
      path: '/profile',
      icon: Activity,
    },
    {
      label: 'Registros',
      path: '/home',
      icon: NotebookText,
    },
    {
      label: 'Configs',
      path: '/configs',
      icon: Settings,
    },
  ];

  return (
    <>
      {user.id && (
        <nav className="w-72 h-screen bg-zinc-800 fixed top-0 left-0 z-10 cursor-pointer shadow-md">
          <div className="h-48 w-72 flex flex-col justify-evenly font-sans items-center">
            <h1 className="text-3xl text-zinc-50">Seleto Inc</h1>
            <div className="relative w-3/4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full h-8 pl-10 pr-3 py-2 rounded-md bg-zinc-700 text-zinc-50 placeholder-zinc-400"
              />
            </div>
          </div>
          <ul className="h-full flex flex-col items-center text-zinc-50 p-4">
            {navigateList.map((item, index) => (
              <li
                onClick={() => handleNavigation(item.path)}
                key={index}
                className="flex w-full text-center items-center p-4 hover:bg-zinc-700 transition-colors gap-3 rounded-sm"
              >
                {item.icon && <item.icon />}
                <a className="flex items-center justify-center">{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navbar;
