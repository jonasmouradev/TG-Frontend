import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes';
import { UserContext } from '@/shared/contexts/UserContext';
import { useState } from 'react';
import { User } from './types/user';
import { ThemeProvider } from './shared/contexts/Theme/ThemeProvider';
import { SidebarProvider } from './shared/contexts/SidebarContext';

function App() {
  const [user] = useState<User>({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: '123456',
    userType: 'user',
  });

  if (!user) {
    return undefined;
  }

  return (
    <ThemeProvider>
      <UserContext.Provider value={user}>
        <SidebarProvider>
          <RouterProvider router={router} />
        </SidebarProvider>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
