import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes';
import { Suspense } from 'react';
import { ThemeProvider } from './shared/contexts/Theme/ThemeProvider';
import { Toaster } from '@shared/components';

function App() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen w-screen bg-white">Loading...</div>}>
      <ThemeProvider>
        <Toaster />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
