import { useEffect, useState } from 'react';
import { UserType, UpdateUserInput } from '../types';
import { useCase } from '@shared/contexts/UseCaseContext';

// Profile services using inline API calls - prepared for use case integration
const profileServices = {
  async getUser(id: string) {
    // TODO: Replace with GetUserUseCase
    const { api } = await import('@shared/services/api');
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async updateUser(id: string, data: UpdateUserInput) {
    // TODO: Replace with UpdateUserUseCase
    const { api } = await import('@shared/services/api');
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  async updateEmail(id: string, email: string) {
    // TODO: Replace with UpdateUserEmailUseCase
    const { api } = await import('@shared/services/api');
    const response = await api.put(`/users/${id}`, { email });
    return response.data;
  },

  async updateUsername(id: string, username: string) {
    // TODO: Replace with UpdateUsernameUseCase (if needed)
    // Mocked implementation
    console.log('Mocked updateUsername called with:', { id, username });
    const getCurrentUserMock = await import('@/mock/getCurrentUser.json');
    return getCurrentUserMock.default;
  },

  async activateUser(id: string) {
    // TODO: Replace with ActivateUserUseCase (if needed)
    const { api } = await import('@shared/services/api');
    const response = await api.post(`/users/${id}`);
    return response.data;
  },

  async deleteUser(id: string) {
    // TODO: Replace with DeleteUserUseCase (if needed)
    const { api } = await import('@shared/services/api');
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};

export const useProfile = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userGateway } = useCase();

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const res = await userGateway.getMe();
      setUser(res.data ?? null);
    } catch {
      setError('Erro ao carregar dados do usuário');
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (id: string, data: UpdateUserInput) => {
    try {
      setIsLoading(true);
      const updatedUser = await profileServices.updateUser(id, data);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      setError('Erro ao atualizar perfil');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserEmail = async (id: string, email: string) => {
    try {
      setIsLoading(true);
      await profileServices.updateEmail(id, email);
      // Refetch user data to get updated info
      await fetchUser();
    } catch (error) {
      setError('Erro ao atualizar email');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserUsername = async (id: string, username: string) => {
    try {
      setIsLoading(true);
      const result = await profileServices.updateUsername(id, username);
      // Update the user state with new data
      if (result) {
        setUser(result);
      }
      return result;
    } catch (error) {
      setError('Erro ao atualizar nome de usuário');
      throw error;
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
    updateProfile,
    updateUserEmail,
    updateUserUsername,
  };
};
