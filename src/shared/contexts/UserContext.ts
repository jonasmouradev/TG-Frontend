import { User } from '@/types/user';
import { createContext, useContext } from 'react';

export const UserContext = createContext<User | undefined>(undefined);

export default function useUserContext() {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error('useUserContext must be used within an UserProvider');
  }

  return user;
}
