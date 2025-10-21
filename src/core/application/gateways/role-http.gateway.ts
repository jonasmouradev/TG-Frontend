import {
  RoleGateway,
  RoleFilters,
  RoleListResponse,
  CreateRoleDto,
  UpdateRoleDto,
  Role,
  Permission,
  AssignPermissionDto,
} from '@/core/domain';
import { IHttpClient, PromiseResponse } from '@/core/domain/ports/http-client.port';

export class RoleHttpGateway implements RoleGateway {
  constructor(private readonly httpClient: IHttpClient) {}

  async getRoles(filters?: RoleFilters): PromiseResponse<RoleListResponse> {
    return this.httpClient.get<RoleListResponse>({
      url: `/roles`,
      params: filters as Record<string, unknown>,
    });
  }

  async getRoleById(id: string): PromiseResponse<Role> {
    return this.httpClient.get<Role>({ url: `/roles/${id}` });
  }

  async createRole(payload: CreateRoleDto): PromiseResponse<Role> {
    return this.httpClient.post<Role>({ url: `/roles`, payload });
  }

  async updateRole(id: string, payload: UpdateRoleDto): PromiseResponse<Role> {
    return this.httpClient.put<Role>({ url: `/roles/${id}`, payload });
  }

  async deleteRole(id: string): PromiseResponse<void> {
    return this.httpClient.delete({ url: `/roles/${id}` });
  }

  async getRolePermissions(id: string): PromiseResponse<Permission[]> {
    return this.httpClient.get<Permission[]>({ url: `/roles/${id}/permissions` });
  }

  async assignPermission(id: string, payload: AssignPermissionDto): PromiseResponse<void> {
    return this.httpClient.post({ url: `/roles/${id}/permissions`, payload });
  }

  async removePermission(id: string, permissionId: string): PromiseResponse<void> {
    return this.httpClient.delete({ url: `/roles/${id}/permissions/${permissionId}` });
  }
}
