import useUserContext from '@/shared/contexts/UserContext';
import useTheme from '@/shared/hooks/useTheme';
import { House, Activity, Search, NotebookText, Settings, Inbox, ChartColumn, Plus, Moon, Sun } from 'lucide-react';
import { ElementType } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Button } from '../../ui';
import { paths } from '@/shared/utils/constants';

const Navbar = () => {
  const user = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const handleNavigation = (path: string) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  const navigateList: { label: string; path: string; icon: ElementType }[] = [
    {
      label: 'Página Inicial',
      path: paths.HOME,
      icon: House,
    },
    {
      label: 'Atividade',
      path: paths.ACTIVITY,
      icon: Activity,
    },
    {
      label: 'Registros',
      path: paths.REGISTERS,
      icon: NotebookText,
    },
    {
      label: 'Caixa de Entrada',
      path: paths.INBOX,
      icon: Inbox,
    },
    {
      label: 'Estatísticas',
      path: paths.STATISTICS,
      icon: ChartColumn,
    },
    {
      label: 'Configurações',
      path: paths.SETTINGS,
      icon: Settings,
    },
  ];

  const Header = () => (
    <header className="h-48 w-72 flex flex-col justify-evenly font-sans items-center">
      <h1 className="text-3xl text-gray-800 dark:text-zinc-50 self-start pl-6">Seleto Inc</h1>
      <div className="relative w-full px-4">
        <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-600 w-4 h-4" />
        <input
          type="search"
          placeholder="Pesquisar..."
          className="w-full h-8 pl-10 pr-3 py-2 rounded-md border border-gray-300 dark:border-gray-800 bg-transparent text-gray-600 dark:text-gray-50 dark:placeholder-zinc-400 text-sm focus:outline-none dark:focus:border-zinc-600"
        />
      </div>
    </header>
  );

  const MenuItems = () => (
    <>
      <ul className="h-auto flex flex-col items-center text-gray-700 dark:text-zinc-50 p-4">
        {navigateList.map((item, index) => (
          <li
            onClick={() => handleNavigation(item.path)}
            key={index}
            className="flex w-full text-center items-center px-4 py-3 dark:hover:bg-gray-700 transition-colors gap-3 rounded-sm dark:text-zinc-200"
          >
            {item.icon && <item.icon size={18} />}
            <a className="flex items-center justify-center text-sm font-medium">{item.label}</a>
          </li>
        ))}
      </ul>
      <div className="relative w-full px-4">
        <Plus className="absolute left-10 top-1/2 transform -translate-y-1/2 text-white w-4 h-4" />
        <Button className="bg-blue-500 w-full dark:text-white hover:bg-zinc-700">Criar uma vaga</Button>
      </div>
    </>
  );

  const Footer = () => (
    <footer className="flex justify-between px-8 bg-transparent dark:border-t border-gray-800 mt-auto py-6">
      <h1 className="text-gray-800 dark:text-gray-400">Tema</h1>
      <button
        onClick={toggleTheme}
        className="text-gray-800 dark:text-gray-400 hover:dark:text-zinc-200 transition-colors p-1 rounded-md dark:hover:bg-zinc-700"
      >
        {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      </button>
    </footer>
  );

  return (
    <>
      {user.id && (
        <nav className="flex flex-col relative w-96 h-screen dark:bg-zinc-950 border-r dark:border-gray-800 top-0 left-0 z-10 cursor-pointer shadow-md">
          <Header />
          <MenuItems />
          <Footer />
        </nav>
      )}
    </>
  );
};

export default Navbar;
