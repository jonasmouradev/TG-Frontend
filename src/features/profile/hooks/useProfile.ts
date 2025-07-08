import { useEffect, useState } from 'react';
import { getCurrentUser } from '../api';
import { UserType } from '../types';

export const useProfile = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const userData = await getCurrentUser();
      setUser(userData);
    } catch {
      setError('Erro ao carregar dados do usuário');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    isLoading,
    error,
    refetch: () => {
      setError(null);
      fetchUser();
    },
  };
};
