export interface Get {
  url: string;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export interface Post {
  url: string;
  payload?: unknown;
  headers?: Record<string, string>;
}

export interface Put {
  url: string;
  payload?: unknown;
  headers?: Record<string, string>;
}

export interface Patch {
  url: string;
  payload?: unknown;
  headers?: Record<string, string>;
}

export interface Delete {
  url: string;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
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
  status: HttpStatusCode;
  statusText: string;
  headers: Record<string, string>;
}

export type PromiseResponse<T> = Promise<IResponse<T | null>>;

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

export abstract class IHttpClient {
  abstract get<T>(options: Get): Promise<IResponse<T | null>>;
  abstract post<T>(options: Post): Promise<IResponse<T | null>>;
  abstract put<T>(options: Put): Promise<IResponse<T | null>>;
  abstract patch<T>(options: Patch): Promise<IResponse<T | null>>;
  abstract delete<T>(options: Delete): Promise<IResponse<T | null>>;
}

export const HttpStatusCode = {
  ok: 200,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  rateLimit: 429,
  unprocessableEntity: 422,
  serverError: 500,
  externalServiceError: 502,
} as const;
export type HttpStatusCode = (typeof HttpStatusCode)[keyof typeof HttpStatusCode];
