import { createBrowserRouter } from 'react-router-dom';
import Configs from '../pages/configs';
import Home from '../pages/home';
import SignUp from '../pages/signUp';
import Profile from '@/pages/profile/Profile';
import SignIn from '@/pages/signIn/SignIn';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SignUp />,
  },
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
    path: '/signIn',
    element: <SignIn />,
  },
]);
