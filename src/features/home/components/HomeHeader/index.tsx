import { Building2, Bell, Settings, LogOut, ArrowLeft } from 'lucide-react';
import {
  Button,
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  paths,
} from '@/shared';
import { useAuthCases } from '@/shared/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProfile } from '@features/profile';

const HomeHeader = ({ children }: { children: React.ReactNode }) => {
  const { signOut } = useAuthCases();
  const navigate = useNavigate();
  const { user } = useProfile();
  const { pathname } = useLocation();
  const isHomePage = pathname === paths.HOME;

  const handleLogout = async () => {
    signOut();
    navigate(paths.SIGN_IN);
  };

  return (
    <>
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm w-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 relative right-10">
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 ${isHomePage ? 'invisible' : ''}`}
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">{user?.username}</h1>
                  <p className="text-xs text-gray-500">Painel de Recrutamento</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="w-9 h-9 border-2 border-blue-200 cursor-pointer">
                    <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">TC</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
      {children}
    </>
  );
};
export default HomeHeader;
