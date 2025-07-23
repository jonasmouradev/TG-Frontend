import useUserContext from '@/shared/contexts/UserContext';
import useTheme from '@/shared/hooks/useTheme';
import { House, Activity, Search, NotebookText, Settings, Inbox, ChartColumn, Plus, Moon, Sun } from 'lucide-react';
import { ElementType } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Button } from '../../ui';
import { paths } from '@/shared/utils/constants';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const user = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const handleNavigation = (path: string) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  const navigateList: { label: string; path: string; icon: ElementType }[] = [
    {
      label: t('home_page'),
      path: paths.HOME,
      icon: House,
    },
    {
      label: t('activity'),
      path: paths.ACTIVITY,
      icon: Activity,
    },
    {
      label: t('registers'),
      path: paths.REGISTERS,
      icon: NotebookText,
    },
    {
      label: t('inbox'),
      path: paths.INBOX,
      icon: Inbox,
    },
    {
      label: t('statistics'),
      path: paths.STATISTICS,
      icon: ChartColumn,
    },
    {
      label: t('settings'),
      path: paths.SETTINGS,
      icon: Settings,
    },
  ];

  const Header = () => (
    <header className="h-48 w-72 flex flex-col justify-evenly font-sans items-center">
      <h1 className="text-3xl text-primary self-start pl-6">Seleto Inc</h1>
      <div className="relative w-full px-4">
        <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-600 w-4 h-4" />
        <input
          type="search"
          placeholder={t('search')}
          className="w-full h-8 pl-10 pr-3 py-2 rounded-md border border-gray-300 dark:border-gray-800 bg-transparent text-primary dark:placeholder-zinc-400 text-sm focus:outline-none dark:focus:border-zinc-600"
        />
      </div>
    </header>
  );

  const MenuItems = () => (
    <>
      <ul className="h-auto flex flex-col items-center text-primary p-4">
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
        <Button className="bg-blue-500 w-full text-white hover:bg-zinc-700">{t('create_vacancy')}</Button>
      </div>
    </>
  );

  const Footer = () => (
    <footer className="flex justify-between px-8 bg-transparent dark:border-t border-gray-800 mt-auto py-6">
      <h1 className="text-secondary">{t('theme')}</h1>
      <button
        onClick={toggleTheme}
        className="text-secondary hover:text-zinc-200 transition-colors p-1 rounded-md hover:bg-zinc-700"
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

export default Sidebar;
