import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@/features/home';
import { SignUpPage, SignInPage } from '@/features/auth';
import { ProfilePage } from '@/features/profile';
import { SettingsPage } from '@/features/settings';
import Layout from '@/shared/components/layout/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SignInPage />,
  },
  {
    path: '/*',
    element: <SignInPage />,
  },
  {
    path: '/signUp',
    element: <SignUpPage />,
  },
  {
    path: '/change-email/:secret',
    element: <div>Change Email</div>,
  },
  {
    path: '/activate/:id',
    element: <div>Activate</div>,
  },
  {
    path: '/:secret/reset-password/:email',
    element: <div>Reset Password</div>,
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/activity',
        element: <h1>Activity</h1>,
      },
      {
        path: '/registers',
        element: <h1>Registers</h1>,
      },
      {
        path: '/inbox',
        element: <h1>Inbox</h1>,
      },
      {
        path: '/statistics',
        element: <h1>Statistics</h1>,
      },
      {
        path: '/configs',
        element: <SettingsPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '*',
        element: <h1>Not Found</h1>,
      },
    ],
  },
]);
