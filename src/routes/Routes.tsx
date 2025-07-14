import { createBrowserRouter } from 'react-router-dom';
import { ProfilePage } from '@/features/profile';
import { SettingsPage } from '@/features/settings';
import { SignUpPage, SignInPage } from '@/features/auth';
import Layout from '@/shared/components/layout/Layout';
import { paths } from '@/shared/utils/constants';
import { lazy } from 'react';

// TODO: add lazy load and change page export to default to avoid .then(module => ({ default: module.HomePage })));
// import { HomePage } from '@/features/home';
const HomePage = lazy(() => import('@/features/home').then(module => ({ default: module.HomePage })));

export const router = createBrowserRouter([
  {
    path: paths.SIGN_IN,
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
