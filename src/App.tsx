import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes';
import { Suspense, useMemo } from 'react';
import { ThemeProvider } from './shared/contexts/Theme/ThemeProvider';
import { Toaster } from '@shared/components';
import { DIContainer } from '@core/infra/container';
import { UseCaseContext } from '@shared/contexts/UseCaseContext';

function App() {
  const container = useMemo(() => new DIContainer(), []);

  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen w-screen bg-white">Loading...</div>}>
      <ThemeProvider>
        <UseCaseContext.Provider value={container}>
          <Toaster />
          <RouterProvider router={router} />
        </UseCaseContext.Provider>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
