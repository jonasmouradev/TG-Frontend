import { Outlet, useLocation } from 'react-router-dom';
import { paths } from '@shared/utils/constants';
import { SidebarProvider, SidebarInset } from '@shared/components/ui/Sidebar';

const Layout = () => {
  const location = useLocation();
  const hideSidebarRoutes: string[] = [paths.SIGN_UP, paths.SIGN_IN];
  const showSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <SidebarInset className="flex-1">
          {showSidebar && (
            <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
              {location.pathname}
              <div className="flex-1" />
            </header>
          )}
          <main className="flex-1">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
