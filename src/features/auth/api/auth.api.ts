import { api } from '@/shared/services/api';
import { SignInOutput, SignUpInput } from '../types';

export async function login(email: string, password: string): Promise<SignInOutput> {
  const response = await api.post('/auth/signin', { email, password });
  return response.data;
}

export async function register(data: SignUpInput): Promise<SignInOutput> {
  const response = await api.post('/auth/signup', data);
  return response.data;
}

export async function requestPasswordChange(email: string) {
  const response = await api.patch('/auth/password', { email });
  return response.data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export async function refreshToken(): Promise<SignInOutput> {
  const response = await api.post('/auth/refresh');
  return response.data;
}
