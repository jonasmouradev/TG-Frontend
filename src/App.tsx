import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes';
import { UserContext } from '@shared/contexts/UserContext';
import { Suspense, useState } from 'react';
import { User } from './types/user';
import { ThemeProvider } from './shared/contexts/Theme/ThemeProvider';
import { Toaster } from '@shared/components';

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
    <Suspense fallback={<div className="flex items-center justify-center h-screen w-screen bg-white">Loading...</div>}>
      <ThemeProvider>
        <UserContext value={user}>
          <Toaster />
          <RouterProvider router={router} />
        </UserContext>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
