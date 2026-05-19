import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { SignUpInput } from '../types';

// Auth services using Clean Architecture approach with gradual migration
const authServices = {
  async signIn(email: string, password: string) {
    // TODO: Replace with AuthenticateUserUseCase when DI container is ready
    const { api } = await import('@shared/services/api');
    const response = await api.post('/auth/signin', { email, password });
    return response.data;
  },

  async signUp(data: SignUpInput) {
    // TODO: Replace with SignUpUseCase when DI container is ready
    const { api } = await import('@shared/services/api');
    const response = await api.post('/auth/signup', data);
    return response.data;
  },

  async resetPassword(secretKey: string, newPassword: string) {
    // TODO: Replace with ResetPasswordUseCase when DI container is ready
    const { api } = await import('@shared/services/api');
    const response = await api.patch('/auth/reset-password', { secretKey, newPassword });
    return response.data;
  },

  async refreshToken() {
    // TODO: Replace with RefreshTokenUseCase when DI container is ready
    const { api } = await import('@shared/services/api');
    const response = await api.post('/auth/refresh');
    return response.data;
  },

  async forgotPassword(email: string) {
    // TODO: Replace with ForgotPasswordUseCase when DI container is ready
    const { api } = await import('@shared/services/api');
    const response = await api.patch('/auth/forgot-password', { email });
    return response.data;
  },
};

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authServices.signIn(email, password);
      toast.success('Logado com sucesso');
      localStorage.setItem('token', response.token);
      navigate('/home');
      return response;
    } catch (error) {
      toast.error('Erro ao fazer login');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (data: SignUpInput) => {
    setIsLoading(true);
    try {
      const response = await authServices.signUp(data);
      toast.success('Conta criada com sucesso');
      localStorage.setItem('token', response.token);
      navigate('/home');
      return response;
    } catch (error) {
      toast.error('Erro ao criar conta');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (secretKey: string, newPassword: string) => {
    setIsLoading(true);
    try {
      await authServices.resetPassword(secretKey, newPassword);
      toast.success('Senha resetada com sucesso');
      navigate('/');
    } catch (error) {
      toast.error('Erro ao resetar senha');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      await authServices.forgotPassword(email);
      toast.success('Email de recuperação enviado');
    } catch (error) {
      toast.error('Erro ao enviar email de recuperação');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    navigate('/');
    toast.success('Logout realizado com sucesso');
  };

  return {
    signIn,
    signUp,
    signOut,
    resetPassword,
    forgotPassword,
    isLoading,
  };
};
