import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes';
import { ThemeProvider } from 'styled-components';
import { UserContext } from './contexts/UserContext';
import { useState } from 'react';
import { User } from './types/user';

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
    <div className="h-screen w-screen">
      <ThemeProvider theme={{ mode: 'dark' }}>
        <UserContext.Provider value={user}>
          <RouterProvider router={router} />
        </UserContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
