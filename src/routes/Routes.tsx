import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/home';
import SignUp from '@/pages/signUp';
import SignIn from '@/pages/signIn';
import Configs from '@/pages/configs';
import Profile from '@/pages/profile';
import Layout from '@/layout/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '/signIn',
    element: <SignUp />,
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
        element: <Home />,
      },
      {
        path: '/configs',
        element: <Configs />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '*',
        element: <h1>Not Found</h1>,
      },
    ],
  },
]);
