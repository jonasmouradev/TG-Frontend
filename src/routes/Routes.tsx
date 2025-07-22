import { createBrowserRouter } from 'react-router-dom';
import { ProfilePage } from '@/features/profile';
import Layout from '@/shared/components/layout/Layout';
import { paths } from '@/shared/utils/constants';
import { lazy } from 'react';

const Home = lazy(() => import('@/features/home'));
const SignIn = lazy(() => import('@/features/auth/pages/SignInPage'));
const SignUp = lazy(() => import('@/features/auth/pages/SignUpPage'));
const Settings = lazy(() => import('@/features/settings'));
const NotFound = lazy(() => import('@/features/NotFound'));

export const router = createBrowserRouter([
  {
    path: paths.SIGN_IN,
    element: <SignIn />,
  },
  {
    path: '/*',
    element: <NotFound />,
  },
  {
    path: paths.SIGN_UP,
    element: <SignUp />,
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
        element: <Home />,
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
        path: paths.SETTINGS,
        element: <Settings />,
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
