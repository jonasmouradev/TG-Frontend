export type Permission = {
  id: string;
  name: string;
  resource: string;
  action: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Role = {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  isActive: boolean;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateRoleDto = {
  name: string;
  description?: string;
};

export type UpdateRoleDto = {
  name?: string;
  description?: string;
};

export type CreatePermissionDto = {
  name: string;
  resource: string;
  action: string;
  description?: string;
};

export type UpdatePermissionDto = {
  name?: string;
  resource?: string;
  action?: string;
  description?: string;
};

export type RoleFilters = {
  name?: string;
  isActive?: boolean;
  isDefault?: boolean;
  companyId?: string;
  page?: number;
  limit?: number;
};

export type PermissionFilters = {
  name?: string;
  resource?: string;
  action?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
};
