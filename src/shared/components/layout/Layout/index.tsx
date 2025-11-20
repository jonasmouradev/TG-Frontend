import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@shared/components/ui/Sidebar';
import { UserContext } from '@shared/contexts/UserContext';
import { useProfile } from '@features/profile';

const Layout = () => {
  const { user } = useProfile();

  if (!user) {
    return undefined;
  }
  return (
    <SidebarProvider>
      <UserContext value={user}>
        <div className="flex min-h-screen w-full bg-background">
          <SidebarInset className="flex-1">
            <main className="flex-1">
              <Outlet />
            </main>
          </SidebarInset>
        </div>
      </UserContext>
    </SidebarProvider>
  );
};

export default Layout;
