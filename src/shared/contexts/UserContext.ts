import { UserType } from '@features/profile';
import { createContext, useContext } from 'react';

export const UserContext = createContext<UserType>({} as UserType);

export default function useUserContext() {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error('useUserContext must be used within an UserProvider');
  }

  return user;
}
