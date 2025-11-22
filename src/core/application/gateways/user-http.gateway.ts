import { User } from '@core/domain';
import {
  UserGateway,
  UpdateUserDto,
  UpdateUserEmailDto,
  UserFilters,
  UserList,
} from '@core/domain/gateways/user.gateway';
import { IHttpClient, PromiseResponse } from '@core/domain/ports/http-client.port';

export class UserHttpGateway implements UserGateway {
  constructor(private readonly httpClient: IHttpClient) {}

  async getMe(): PromiseResponse<User> {
    return this.httpClient.get<User>({ url: '/users/me' });
  }

  async getUser(id: string): PromiseResponse<User> {
    return this.httpClient.get<User>({ url: `/users/${id}` });
  }

  async getAllUsers(params?: UserFilters): PromiseResponse<UserList> {
    return this.httpClient.get<UserList>({ url: '/users', params });
  }

  async updateUser(id: string, payload: UpdateUserDto): PromiseResponse<User> {
    return this.httpClient.put<User>({ url: `/users/${id}`, payload });
  }

  async updateUserEmail(id: string, payload: UpdateUserEmailDto): PromiseResponse<User> {
    return this.httpClient.put<User>({ url: `/users/${id}`, payload });
  }

  async deleteUser(id: string): PromiseResponse<void> {
    return this.httpClient.delete({ url: `/users/${id}` });
  }
}
