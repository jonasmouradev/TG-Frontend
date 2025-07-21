import { describe, it, expect } from 'vitest';
import { IApiClientConfig, IResourceAPI } from '../interfaces';

describe('ApiClient Interfaces', () => {
  describe('IApiClientConfig', () => {
    it('should allow empty configuration object', () => {
      const config: IApiClientConfig = {};
      expect(config).toBeDefined();
      expect(Object.keys(config)).toHaveLength(0);
    });

    it('should allow partial configuration with baseURL only', () => {
      const config: IApiClientConfig = {
        baseURL: 'https://api.example.com',
      };

      expect(config.baseURL).toBe('https://api.example.com');
      expect(config.timeout).toBeUndefined();
      expect(config.headers).toBeUndefined();
    });

    it('should allow partial configuration with timeout only', () => {
      const config: IApiClientConfig = {
        timeout: 5000,
      };

      expect(config.timeout).toBe(5000);
      expect(config.baseURL).toBeUndefined();
      expect(config.headers).toBeUndefined();
    });

    it('should allow partial configuration with headers only', () => {
      const config: IApiClientConfig = {
        headers: {
          Authorization: 'Bearer token',
          'Content-Type': 'application/json',
        },
      };

      expect(config.headers).toEqual({
        Authorization: 'Bearer token',
        'Content-Type': 'application/json',
      });
      expect(config.baseURL).toBeUndefined();
      expect(config.timeout).toBeUndefined();
    });

    it('should allow complete configuration', () => {
      const config: IApiClientConfig = {
        baseURL: 'https://api.example.com',
        timeout: 10000,
        headers: {
          'X-API-Key': 'api-key',
          Accept: 'application/json',
        },
      };

      expect(config.baseURL).toBe('https://api.example.com');
      expect(config.timeout).toBe(10000);
      expect(config.headers).toEqual({
        'X-API-Key': 'api-key',
        Accept: 'application/json',
      });
    });

    it('should support dynamic header keys', () => {
      const dynamicKey = 'X-Custom-Header';
      const config: IApiClientConfig = {
        headers: {
          [dynamicKey]: 'dynamic-value',
        },
      };

      expect(config.headers?.[dynamicKey]).toBe('dynamic-value');
    });

    it('should support numeric timeout values', () => {
      const config: IApiClientConfig = {
        timeout: 30000,
      };

      expect(typeof config.timeout).toBe('number');
      expect(config.timeout).toBe(30000);
    });

    it('should support various baseURL formats', () => {
      const configs = [
        { baseURL: 'https://api.example.com' },
        { baseURL: 'http://localhost:3000' },
        { baseURL: '/api/v1' },
        { baseURL: 'api' },
        { baseURL: 'https://api.example.com/v2/' },
      ];

      configs.forEach(config => {
        const apiConfig: IApiClientConfig = config;
        expect(apiConfig.baseURL).toBe(config.baseURL);
      });
    });
  });

  describe('IResourceAPI', () => {
    // Define test types
    type User = {
      id: number;
      name: string;
      email: string;
    };

    type PaginatedUsers = {
      data: User[];
      total: number;
      page: number;
      limit: number;
    };

    type CreateUser = {
      id: number;
      name: string;
      email: string;
      createdAt: string;
    };

    type UpdateUser = {
      id: number;
      name: string;
      email: string;
      updatedAt: string;
    };

    it('should define all required methods', () => {
      // Create a mock implementation to test the interface structure
      const mockAPI: IResourceAPI<User, PaginatedUsers, CreateUser, UpdateUser> = {
        getAll: async () => null,
        getById: async () => null,
        create: async () => null,
        update: async () => null,
        patch: async () => null,
        delete: async () => null,
      };

      expect(typeof mockAPI.getAll).toBe('function');
      expect(typeof mockAPI.getById).toBe('function');
      expect(typeof mockAPI.create).toBe('function');
      expect(typeof mockAPI.update).toBe('function');
      expect(typeof mockAPI.patch).toBe('function');
      expect(typeof mockAPI.delete).toBe('function');
    });

    it('should support async methods', () => {
      const mockAPI: IResourceAPI<User, PaginatedUsers, CreateUser, UpdateUser> = {
        getAll: async () => ({
          data: [],
          total: 0,
          page: 1,
          limit: 10,
        }),
        getById: async () => ({
          id: 1,
          name: 'John',
          email: 'john@example.com',
        }),
        create: async () => ({
          id: 1,
          name: 'John',
          email: 'john@example.com',
          createdAt: '2023-01-01T00:00:00Z',
        }),
        update: async () => ({
          id: 1,
          name: 'John Updated',
          email: 'john.updated@example.com',
          updatedAt: '2023-01-01T00:00:00Z',
        }),
        patch: async () => ({
          id: 1,
          name: 'John Patched',
          email: 'john@example.com',
          updatedAt: '2023-01-01T00:00:00Z',
        }),
        delete: async () => {},
      };

      // Test that all methods return promises
      expect(mockAPI.getAll()).toBeInstanceOf(Promise);
      expect(mockAPI.getById(1)).toBeInstanceOf(Promise);
      expect(mockAPI.create({})).toBeInstanceOf(Promise);
      expect(mockAPI.update(1, {})).toBeInstanceOf(Promise);
      expect(mockAPI.patch(1, {})).toBeInstanceOf(Promise);
      expect(mockAPI.delete(1)).toBeInstanceOf(Promise);
    });

    it('should support nullable return types', () => {
      const mockAPI: IResourceAPI<User, PaginatedUsers, CreateUser, UpdateUser> = {
        getAll: async () => null,
        getById: async () => null,
        create: async () => null,
        update: async () => null,
        patch: async () => null,
        delete: async () => null,
      };

      expect(mockAPI).toBeDefined();
    });

    it('should support different ID types', async () => {
      const mockAPI: IResourceAPI<User, PaginatedUsers, CreateUser, UpdateUser> = {
        getAll: async () => null,
        getById: async id => {
          // Should accept both string and number
          if (typeof id === 'string') {
            return { id: parseInt(id, 10), name: 'String ID User', email: 'string@example.com' };
          } else {
            return { id, name: 'Number ID User', email: 'number@example.com' };
          }
        },
        create: async () => null,
        update: async id => {
          if (typeof id === 'string') {
            return { id: parseInt(id, 10), name: 'Updated', email: 'updated@example.com', updatedAt: '2023-01-01' };
          } else {
            return { id, name: 'Updated', email: 'updated@example.com', updatedAt: '2023-01-01' };
          }
        },
        patch: async id => {
          if (typeof id === 'string') {
            return { id: parseInt(id, 10), name: 'Patched', email: 'patched@example.com', updatedAt: '2023-01-01' };
          } else {
            return { id, name: 'Patched', email: 'patched@example.com', updatedAt: '2023-01-01' };
          }
        },
        delete: async () => null,
      };

      // Test string ID
      const stringResult = await mockAPI.getById('123');
      expect(stringResult?.id).toBe(123);
      expect(stringResult?.name).toBe('String ID User');

      // Test number ID
      const numberResult = await mockAPI.getById(456);
      expect(numberResult?.id).toBe(456);
      expect(numberResult?.name).toBe('Number ID User');
    });

    it('should support optional parameters in getAll', () => {
      const mockAPI: IResourceAPI<User, PaginatedUsers, CreateUser, UpdateUser> = {
        getAll: async params => {
          if (params) {
            return {
              data: [],
              total: 0,
              page: (params.page as number) || 1,
              limit: (params.limit as number) || 10,
            };
          }
          return {
            data: [],
            total: 0,
            page: 1,
            limit: 10,
          };
        },
        getById: async () => null,
        create: async () => null,
        update: async () => null,
        patch: async () => null,
        delete: async () => null,
      };

      // Should work without parameters
      expect(mockAPI.getAll()).toBeInstanceOf(Promise);

      // Should work with parameters
      expect(mockAPI.getAll({ page: 2, limit: 20 })).toBeInstanceOf(Promise);
    });

    it('should support partial data in create, update, and patch methods', () => {
      const mockAPI: IResourceAPI<User, PaginatedUsers, CreateUser, UpdateUser> = {
        getAll: async () => null,
        getById: async () => null,
        create: async data => {
          // Should accept partial User data
          return {
            id: 1,
            name: data.name || 'Default Name',
            email: data.email || 'default@example.com',
            createdAt: '2023-01-01T00:00:00Z',
          };
        },
        update: async (id, data) => {
          return {
            id: typeof id === 'string' ? parseInt(id, 10) : id,
            name: data.name || 'Updated Name',
            email: data.email || 'updated@example.com',
            updatedAt: '2023-01-01T00:00:00Z',
          };
        },
        patch: async (id, data) => {
          return {
            id: typeof id === 'string' ? parseInt(id, 10) : id,
            name: data.name || 'Patched Name',
            email: data.email || 'patched@example.com',
            updatedAt: '2023-01-01T00:00:00Z',
          };
        },
        delete: async () => null,
      };

      // Should accept partial data
      expect(mockAPI.create({ name: 'John' })).toBeInstanceOf(Promise);
      expect(mockAPI.create({ email: 'john@example.com' })).toBeInstanceOf(Promise);
      expect(mockAPI.create({})).toBeInstanceOf(Promise);

      expect(mockAPI.update(1, { name: 'John' })).toBeInstanceOf(Promise);
      expect(mockAPI.patch(1, { email: 'john@example.com' })).toBeInstanceOf(Promise);
    });

    it('should handle different generic type combinations', () => {
      // Test with simple types
      type SimpleEntity = { id: string };
      type SimplePaginated = { items: SimpleEntity[] };
      type SimpleCreate = SimpleEntity & { created: boolean };
      type SimpleUpdate = SimpleEntity & { updated: boolean };

      const simpleAPI: IResourceAPI<SimpleEntity, SimplePaginated, SimpleCreate, SimpleUpdate> = {
        getAll: async () => ({ items: [] }),
        getById: async id => ({ id: String(id) }),
        create: async () => ({ id: 'new', created: true }),
        update: async id => ({ id: String(id), updated: true }),
        patch: async id => ({ id: String(id), updated: true }),
        delete: async () => {},
      };

      expect(simpleAPI).toBeDefined();
      expect(typeof simpleAPI.getAll).toBe('function');
    });
  });

  describe('Interface flexibility', () => {
    it('should support extending the interfaces', () => {
      // Test that interfaces can be extended
      interface ExtendedApiClientConfig extends IApiClientConfig {
        retries?: number;
        retryDelay?: number;
      }

      const extendedConfig: ExtendedApiClientConfig = {
        baseURL: 'https://api.example.com',
        timeout: 10000,
        retries: 3,
        retryDelay: 1000,
      };

      expect(extendedConfig.baseURL).toBe('https://api.example.com');
      expect(extendedConfig.retries).toBe(3);
      expect(extendedConfig.retryDelay).toBe(1000);
    });

    it('should support interface composition', () => {
      // Test combining interfaces
      type CustomEntity = {
        id: number;
        customField: string;
      };

      type CustomPaginated = {
        results: CustomEntity[];
        metadata: {
          total: number;
          hasMore: boolean;
        };
      };

      const customAPI: IResourceAPI<CustomEntity, CustomPaginated, CustomEntity, CustomEntity> = {
        getAll: async () => ({
          results: [],
          metadata: {
            total: 0,
            hasMore: false,
          },
        }),
        getById: async () => null,
        create: async () => null,
        update: async () => null,
        patch: async () => null,
        delete: async () => null,
      };

      expect(customAPI).toBeDefined();
    });
  });
});
