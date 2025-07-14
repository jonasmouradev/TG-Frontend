import useUserContext from '@/shared/contexts/UserContext';
import { House, Activity, Search, NotebookText, Settings, Inbox, ChartColumn, Plus, Moon } from 'lucide-react';
import { ElementType } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Button } from '../../ui';

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
      label: 'Página Inicial',
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
      label: 'Caixa de Entrada',
      path: '/home',
      icon: Inbox,
    },
    {
      label: 'Estatísticas',
      path: '/home',
      icon: ChartColumn,
    },
    {
      label: 'Configurações',
      path: '/configs',
      icon: Settings,
    },
  ];

  const Header = () => (
    <header className="h-48 w-72 flex flex-col justify-evenly font-sans items-center">
      <h1 className="text-3xl text-zinc-50 self-start pl-6">Seleto Inc</h1>
      <div className="relative w-full px-4">
        <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
        <input
          type="search"
          placeholder="Pesquisar..."
          className="w-full h-8 pl-10 pr-3 py-2 rounded-md border-2 border-zinc-900 bg-transparent text-zinc-50 placeholder-zinc-400 text-sm &:focus"
        />
      </div>
    </header>
  );

  const MenuItems = () => (
    <>
      <ul className="h-auto flex flex-col items-center text-zinc-50 p-4">
        {navigateList.map((item, index) => (
          <li
            onClick={() => handleNavigation(item.path)}
            key={index}
            className="flex w-full text-center items-center px-4 py-3 hover:bg-zinc-700 transition-colors gap-3 rounded-sm text-zinc-200"
          >
            {item.icon && <item.icon size={18} />}
            <a className="flex items-center justify-center text-sm font-medium">{item.label}</a>
          </li>
        ))}
      </ul>
      <div className="relative w-full px-4">
        <Plus className="absolute left-10 top-1/2 transform -translate-y-1/2 text-white w-4 h-4" />
        <Button className="bg-blue-500 w-full">Criar uma vaga</Button>
      </div>
    </>
  );

  const Footer = () => (
    <footer className="flex justify-between px-8 bg-transparent border-t-2 border-zinc-900 mt-auto py-6">
      <h1 className="text-zinc-400">Tema</h1>
      <Moon className="text-zinc-400" />
    </footer>
  );

  return (
    <>
      {user.id && (
        <nav className="flex flex-col w-72 h-screen bg-transparent border-r-2 border-zinc-900 fixed top-0 left-0 z-10 cursor-pointer shadow-md">
          <Header />
          <MenuItems />
          <Footer />
        </nav>
      )}
    </>
  );
};

export default Navbar;
