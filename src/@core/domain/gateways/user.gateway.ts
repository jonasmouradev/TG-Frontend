import { User } from '../entities';
import { PromiseResponse } from '../ports/http-client.port';

type UpdateUserDto = {
  name?: string;
  email?: string;
  type?: string;
};

type UpdateUserEmailDto = {
  email: string;
};

type UserFilters = {
  type?: string;
  companyId?: string;
  page?: number;
  limit?: number;
};

type UserList = {
  users: User[];
  total: number;
  page: number;
  limit: number;
};

export interface UserGateway {
  getCurrentUser(): PromiseResponse<User | null>;
  getUser(id: string): PromiseResponse<User | null>;
  getAllUsers(params?: UserFilters): PromiseResponse<UserList | null>;
  updateUser(id: string, payload: UpdateUserDto): PromiseResponse<User | null>;
  updateUserEmail(id: string, payload: UpdateUserEmailDto): PromiseResponse<User | null>;
  deleteUser(id: string): PromiseResponse<void | null>;
}

export type { UpdateUserDto, UpdateUserEmailDto, UserFilters, UserList };
