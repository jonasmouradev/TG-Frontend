import { Building2, Bell, Settings } from 'lucide-react';
import { Button, Avatar, AvatarFallback } from '@/shared';

const HomeHeader = () => (
  <header className="bg-white sticky top-0 z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">TechCorp</h1>
            <p className="text-xs text-gray-500">Painel de Recrutamento</p>
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
          <Avatar className="w-9 h-9 border-2 border-blue-200">
            <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">TC</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  </header>
);
export default HomeHeader;
