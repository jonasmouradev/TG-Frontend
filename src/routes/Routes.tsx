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
    path: paths.SIGN_UP,
    element: <SignUpPage />,
  },
  {
    path: paths.CHANGE_EMAIL,
    element: <div>Change Email</div>,
  },
  {
    path: paths.ACTIVATE,
    element: <div>Activate</div>,
  },
  {
    path: paths.RESET_PASSWORD,
    element: <div>Reset Password</div>,
  },
  {
    element: <Layout />,
    children: [
      {
        path: paths.HOME,
        element: <HomePage />,
      },
      {
        path: paths.ACTIVITY,
        element: <h1>Activity</h1>,
      },
      {
        path: paths.REGISTERS,
        element: <h1>Registers</h1>,
      },
      {
        path: paths.INBOX,
        element: <h1>Inbox</h1>,
      },
      {
        path: paths.STATISTICS,
        element: <h1>Statistics</h1>,
      },
      {
        path: paths.CONFIGS,
        element: <SettingsPage />,
      },
      {
        path: paths.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: '*',
        element: <h1>Not Found</h1>,
      },
    ],
  },
]);
