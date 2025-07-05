import { api } from '@/shared/services/api';
import { UserType, UpdateUserInput } from '../types';

export async function getUser(id: string): Promise<UserType> {
  const response = await api.get(`/users/${id}`);
  return response.data;
}

export async function getCurrentUser(): Promise<UserType> {
  const response = await api.get('/users/me');
  return response.data;
}

export async function updateUser(id: string, data: UpdateUserInput): Promise<UserType> {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
}

export async function activateUser(id: string): Promise<void> {
  const response = await api.post(`/users/${id}`);
  return response.data;
}

export async function updateEmail(id: string, email: string): Promise<void> {
  const response = await api.put(`/users/${id}`, { email });
  return response.data;
}

export async function updateUsername(id: string, username: string): Promise<void> {
  const response = await api.put(`/users/${id}`, { username });
  return response.data;
}

export async function deleteUser(id: string): Promise<void> {
  const response = await api.delete(`/users/${id}`);
  return response.data;
}
