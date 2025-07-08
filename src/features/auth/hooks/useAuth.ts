import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { login, register } from '../api';
import { SignUpInput } from '../types';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await login(email, password);
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
      const response = await register(data);
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

  const signOut = () => {
    localStorage.removeItem('token');
    navigate('/');
    toast.success('Logout realizado com sucesso');
  };

  return {
    signIn,
    signUp,
    signOut,
    isLoading,
  };
};
