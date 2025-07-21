export interface IApiClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface IResourceAPI<Entity, PaginatedEntities, CreateEntity, UpdateEntity> {
  getAll(params?: Record<string, unknown>): Promise<PaginatedEntities | null>;
  getById(id: string | number): Promise<Entity | null>;
  create(data: Partial<Entity>): Promise<CreateEntity | null>;
  update(id: string | number, data: Partial<Entity>): Promise<UpdateEntity | null>;
  patch(id: string | number, data: Partial<Entity>): Promise<UpdateEntity | null>;
  delete(id: string | number): Promise<void | null>;
}

export interface IRequest {
  url?: string;
  method?: string;
  data?: Record<string, unknown>;
  params?: Record<string, unknown>;
  headers: Record<string, string>;
}

export interface IResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}
