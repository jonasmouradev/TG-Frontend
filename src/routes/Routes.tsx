import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '@shared/components/layout/Layout';
import { paths } from '@shared/utils/constants';
import { lazy } from 'react';
import ActiveVacancies from '@features/activeVacancies';

const Home = lazy(() => import('@features/home'));
const SignIn = lazy(() => import('@features/auth/pages/SignInPage'));
const SignUp = lazy(() => import('@features/auth/pages/SignUpPage'));
const Settings = lazy(() => import('@features/settings'));
const NotFound = lazy(() => import('@features/NotFound'));
const Activity = lazy(() => import('@features/activity'));
const NewVacancy = lazy(() => import('@features/newVacancy'));
const Profile = lazy(() => import('@features/profile'));
const Scheduling = lazy(() => import('@features/scheduling'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={paths.SIGN_IN} replace />,
  },
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
        element: <Activity />,
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
        element: <Profile />,
      },
      {
        path: paths.NEW_VACANCY,
        element: <NewVacancy />,
      },
      {
        path: paths.ACTIVE_VACANCIES,
        element: <ActiveVacancies />,
      },
      {
        path: paths.SCHEDULING,
        element: <Scheduling />,
      },
      {
        path: '*',
        element: <h1>Not Found</h1>,
      },
    ],
  },
]);
