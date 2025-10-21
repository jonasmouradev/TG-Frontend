import { PromiseResponse } from '@/core/domain/ports/http-client.port';
import { CreateRoleDto, Permission, Role, RoleFilters, UpdateRoleDto } from '../entities';

export interface RoleListResponse {
  data: Role[];
  meta: {
    currentPage: number;
    perPage: number;
    lastPage: number;
    total: number;
  };
}

export interface AssignPermissionDto {
  permissionId: string;
}

export abstract class RoleGateway {
  abstract getRoles(filters?: RoleFilters): PromiseResponse<RoleListResponse>;
  abstract getRoleById(id: string): PromiseResponse<Role>;
  abstract createRole(payload: CreateRoleDto): PromiseResponse<Role>;
  abstract updateRole(id: string, payload: UpdateRoleDto): PromiseResponse<Role>;
  abstract deleteRole(id: string): PromiseResponse<void>;
  abstract getRolePermissions(id: string): PromiseResponse<Permission[]>;
  abstract assignPermission(id: string, payload: AssignPermissionDto): PromiseResponse<void>;
  abstract removePermission(id: string, permissionId: string): PromiseResponse<void>;
}
