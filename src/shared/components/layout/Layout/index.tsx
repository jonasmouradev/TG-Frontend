import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@shared/components/ui/Sidebar';

const Layout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <SidebarInset className="flex-1">
          <main className="flex-1">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
