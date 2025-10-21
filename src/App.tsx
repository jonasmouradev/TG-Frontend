import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes';
import { UserContext } from '@shared/contexts/UserContext';
import { Suspense, useState } from 'react';
import { User } from './types/user';
import { ThemeProvider } from './shared/contexts/Theme/ThemeProvider';

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
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider>
        <UserContext.Provider value={user}>
          <RouterProvider router={router} />
        </UserContext.Provider>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
