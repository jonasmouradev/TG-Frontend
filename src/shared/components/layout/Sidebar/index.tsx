import useUserContext from '@/shared/contexts/UserContext';
import useTheme from '@/shared/hooks/useTheme';
import { House, Activity, Search, NotebookText, Settings, Inbox, ChartColumn, Plus, Moon, Sun } from 'lucide-react';
import { ElementType } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { paths } from '@/shared/utils/constants';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const AppSidebar = () => {
  const user = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { setOpenMobile } = useSidebar();
  const isActive = (path: string) => location.pathname === path;

  const handleNavigation = (path: string) => {
    if (location.pathname !== path) {
      navigate(path);
    }
    setOpenMobile(false);
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

  if (!user.id) {
    return null;
  }

  return (
    <ShadcnSidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="p-4">
        <h1 className="text-2xl font-bold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
          Seleto Inc
        </h1>
        <div className="relative mt-4 group-data-[collapsible=icon]:hidden">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="search"
            placeholder={t('search')}
            className="pl-9 h-9"
          />
        </div>
      </SidebarHeader>

      <Separator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigateList.map(item => {
                const itemIsActive = isActive(item.path);
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      onClick={() => handleNavigation(item.path)}
                      isActive={itemIsActive}
                      tooltip={item.label}
                      className="relative"
                    >
                      {itemIsActive && (
                        <motion.div
                          layoutId="active-indicator"
                          className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4 group-data-[collapsible=icon]:hidden">
          <Button
            className="w-full"
            onClick={() => handleNavigation(paths.NEW_VACANCY)}
          >
            <Plus className="w-4 h-4 mr-2" />
            {t('create_vacancy')}
          </Button>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Separator className="mb-4" />
        <div className="flex items-center justify-between group-data-[collapsible=icon]:justify-center">
          <span className="text-sm text-muted-foreground group-data-[collapsible=icon]:hidden">
            {t('theme')}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  );
};

export default AppSidebar;
