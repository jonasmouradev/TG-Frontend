import { describe, it, expect, beforeEach, vi, type Mock, afterEach } from 'vitest';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { RequestInterceptor } from '../Interceptors/Request';
import { ResponseInterceptor } from '../Interceptors/Response';
import { ApiClientFactory } from '../Factory';
import { IStorage } from '../../Storage/interface';
import { ITokenManager } from '../../TokenManager/interface';
import { IAuthManager } from '../../AuthManager/interface';
import { IHttpClient } from '../../Transporter/Http/interface';
import { IApiClientConfig, IResourceAPI } from '../interfaces';

// Define types for tests
type TestEntity = { id: number; name: string };
type TestPaginatedEntities = { data: TestEntity[]; total: number };
type TestCreateEntity = TestEntity;
type TestUpdateEntity = TestEntity;

// Mock axios
vi.mock('axios', () => ({
  default: {
    create: vi.fn(),
  },
}));

const mockAxiosCreate = vi.mocked(axios.create);

describe('ApiClient Tests', () => {
  describe('RequestInterceptor', () => {
    let requestInterceptor: RequestInterceptor;
    let mockTokenStorage: IStorage;
    let mockTokenManager: ITokenManager;
    let mockAuthManager: IAuthManager;

    beforeEach(() => {
      mockTokenStorage = {
        getAuthToken: vi.fn(),
        getCompanyId: vi.fn(),
        setAuthToken: vi.fn(),
        getUser: vi.fn(),
        setUser: vi.fn(),
        setCompanyId: vi.fn(),
        removeStorage: vi.fn(),
        getExpiresIn: vi.fn(),
        setExpiresIn: vi.fn(),
      };

      mockTokenManager = {
        isTokenExpiredOrAboutToExpire: vi.fn(),
        decodeToken: vi.fn(),
        refreshToken: vi.fn(),
      };

      mockAuthManager = {
        signOut: vi.fn(),
      };

      requestInterceptor = new RequestInterceptor(mockTokenStorage, mockTokenManager, mockAuthManager);
    });

    describe('handleRequest', () => {
      const mockRequest: InternalAxiosRequestConfig = {
        url: '/api/test',
        headers: {} as InternalAxiosRequestConfig['headers'],
      };

      it('should add authorization header when valid token exists', async () => {
        // Arrange
        (mockTokenStorage.getAuthToken as Mock).mockReturnValue('validToken');
        (mockTokenStorage.getCompanyId as Mock).mockReturnValue('company123');
        (mockTokenManager.decodeToken as Mock).mockReturnValue('decodedToken');
        (mockTokenManager.isTokenExpiredOrAboutToExpire as Mock).mockReturnValue(false);

        // Act
        const result = await requestInterceptor.handleRequest(mockRequest);

        // Assert
        expect(result.headers.Authorization).toBe('Bearer decodedToken');
        expect(result.headers.companyId).toBe('company123');
      });

      it('should refresh token when token is expired', async () => {
        // Arrange
        (mockTokenStorage.getAuthToken as Mock).mockReturnValue('expiredToken');
        (mockTokenManager.decodeToken as Mock).mockReturnValue('decodedToken');
        (mockTokenManager.isTokenExpiredOrAboutToExpire as Mock).mockReturnValue(true);
        (mockTokenManager.refreshToken as Mock).mockResolvedValue('newToken');

        // Act
        const result = await requestInterceptor.handleRequest(mockRequest);

        // Assert
        expect(mockTokenManager.refreshToken).toHaveBeenCalled();
        expect(mockTokenStorage.setAuthToken).toHaveBeenCalledWith('newToken');
        expect(result.headers.Authorization).toBe('Bearer newToken');
      });

      it('should call signOut when token decode fails', async () => {
        // Arrange
        (mockTokenStorage.getAuthToken as Mock).mockReturnValue('invalidToken');
        (mockTokenManager.decodeToken as Mock).mockImplementation(() => {
          throw new Error('Invalid token');
        });

        // Act
        await requestInterceptor.handleRequest(mockRequest);

        // Assert
        expect(mockAuthManager.signOut).toHaveBeenCalled();
      });

      it('should skip token handling for refresh-token requests', async () => {
        // Arrange
        const refreshRequest = { ...mockRequest, url: '/api/refresh-token' };

        // Act
        const result = await requestInterceptor.handleRequest(refreshRequest);

        // Assert
        expect(mockTokenStorage.getAuthToken).not.toHaveBeenCalled();
        expect(result).toEqual(refreshRequest);
      });

      it('should handle refresh token failure by signing out', async () => {
        // Arrange
        (mockTokenStorage.getAuthToken as Mock).mockReturnValue('expiredToken');
        (mockTokenManager.decodeToken as Mock).mockReturnValue('decodedToken');
        (mockTokenManager.isTokenExpiredOrAboutToExpire as Mock).mockReturnValue(true);
        (mockTokenManager.refreshToken as Mock).mockRejectedValue(new Error('Refresh failed'));

        // Act
        await requestInterceptor.handleRequest(mockRequest);

        // Assert
        expect(mockAuthManager.signOut).toHaveBeenCalled();
      });

      it('should handle missing token gracefully', async () => {
        // Arrange
        (mockTokenStorage.getAuthToken as Mock).mockReturnValue(null);

        // Act
        await requestInterceptor.handleRequest(mockRequest);

        // Assert
        expect(mockTokenManager.refreshToken).toHaveBeenCalled();
      });
    });
  });

  describe('ResponseInterceptor', () => {
    let responseInterceptor: ResponseInterceptor;
    let mockTokenStorage: IStorage;
    let mockAuthManager: IAuthManager;

    beforeEach(() => {
      mockTokenStorage = {
        getAuthToken: vi.fn(),
        getCompanyId: vi.fn(),
        setAuthToken: vi.fn(),
        getUser: vi.fn(),
        setUser: vi.fn(),
        setCompanyId: vi.fn(),
        removeStorage: vi.fn(),
        getExpiresIn: vi.fn(),
        setExpiresIn: vi.fn(),
      };

      mockAuthManager = {
        signOut: vi.fn(),
      };

      responseInterceptor = new ResponseInterceptor(mockTokenStorage, mockAuthManager);
    });

    describe('handleResponse', () => {
      it('should sign out when receiving 401 with valid token', () => {
        // Arrange
        (mockTokenStorage.getAuthToken as Mock).mockReturnValue('validToken');
        const mockResponse: AxiosResponse = {
          status: 401,
          data: {},
          statusText: 'Unauthorized',
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        };

        // Act
        const result = responseInterceptor.handleResponse(mockResponse);

        // Assert
        expect(mockAuthManager.signOut).toHaveBeenCalled();
        expect(result).toBe(mockResponse);
      });

      it('should not sign out when receiving 401 without token', () => {
        // Arrange
        (mockTokenStorage.getAuthToken as Mock).mockReturnValue(null);
        const mockResponse: AxiosResponse = {
          status: 401,
          data: {},
          statusText: 'Unauthorized',
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        };

        // Act
        const result = responseInterceptor.handleResponse(mockResponse);

        // Assert
        expect(mockAuthManager.signOut).not.toHaveBeenCalled();
        expect(result).toBe(mockResponse);
      });

      it('should not sign out for successful responses', () => {
        // Arrange
        (mockTokenStorage.getAuthToken as Mock).mockReturnValue('validToken');
        const mockResponse: AxiosResponse = {
          status: 200,
          data: { success: true },
          statusText: 'OK',
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        };

        // Act
        const result = responseInterceptor.handleResponse(mockResponse);

        // Assert
        expect(mockAuthManager.signOut).not.toHaveBeenCalled();
        expect(result).toBe(mockResponse);
      });

      it('should not sign out for other error statuses', () => {
        // Arrange
        (mockTokenStorage.getAuthToken as Mock).mockReturnValue('validToken');
        const mockResponse: AxiosResponse = {
          status: 500,
          data: { error: 'Server error' },
          statusText: 'Internal Server Error',
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        };

        // Act
        const result = responseInterceptor.handleResponse(mockResponse);

        // Assert
        expect(mockAuthManager.signOut).not.toHaveBeenCalled();
        expect(result).toBe(mockResponse);
      });
    });
  });

  describe('ApiClientFactory', () => {
    let mockTokenStorage: IStorage;
    let mockTokenManager: ITokenManager;
    let mockAuthManager: IAuthManager;
    let mockHttpTransporter: IHttpClient;
    let mockAxiosInstance: {
      interceptors: {
        request: { use: Mock };
        response: { use: Mock };
      };
    };

    beforeEach(() => {
      mockTokenStorage = {
        getAuthToken: vi.fn(),
        getCompanyId: vi.fn(),
        setAuthToken: vi.fn(),
        getUser: vi.fn(),
        setUser: vi.fn(),
        setCompanyId: vi.fn(),
        removeStorage: vi.fn(),
        getExpiresIn: vi.fn(),
        setExpiresIn: vi.fn(),
      };

      mockTokenManager = {
        isTokenExpiredOrAboutToExpire: vi.fn(),
        decodeToken: vi.fn(),
        refreshToken: vi.fn(),
      };

      mockAuthManager = {
        signOut: vi.fn(),
      };

      mockHttpTransporter = {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        patch: vi.fn(),
        delete: vi.fn(),
      };

      mockAxiosInstance = {
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() },
        },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockAxiosCreate.mockReturnValue(mockAxiosInstance as any);
    });

    afterEach(() => {
      ApiClientFactory.reset();
      vi.clearAllMocks();
    });

    describe('create', () => {
      it('should create axios instance with default config', () => {
        // Act
        const instance = ApiClientFactory.create(
          {},
          mockTokenStorage,
          mockTokenManager,
          mockAuthManager,
          mockHttpTransporter,
        );

        // Assert
        expect(mockAxiosCreate).toHaveBeenCalledWith({
          baseURL: 'https://antecedents.develop.inciclebeta.com/api/v1',
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        expect(instance).toBe(mockAxiosInstance);
      });

      it('should create axios instance with custom config', () => {
        // Arrange
        const config: IApiClientConfig = {
          baseURL: 'https://api.example.com',
          timeout: 5000,
          headers: { 'Custom-Header': 'value' },
        };

        // Act
        ApiClientFactory.create(config, mockTokenStorage, mockTokenManager, mockAuthManager, mockHttpTransporter);

        // Assert
        expect(mockAxiosCreate).toHaveBeenCalledWith({
          baseURL: 'https://api.example.com',
          timeout: 5000,
          headers: {
            'Content-Type': 'application/json',
            'Custom-Header': 'value',
          },
        });
      });

      it('should setup request and response interceptors', () => {
        // Act
        ApiClientFactory.create({}, mockTokenStorage, mockTokenManager, mockAuthManager, mockHttpTransporter);

        // Assert
        expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalled();
        expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled();
      });

      it('should return same instance on subsequent calls', () => {
        // Act
        const instance1 = ApiClientFactory.create(
          {},
          mockTokenStorage,
          mockTokenManager,
          mockAuthManager,
          mockHttpTransporter,
        );
        const instance2 = ApiClientFactory.create(
          {},
          mockTokenStorage,
          mockTokenManager,
          mockAuthManager,
          mockHttpTransporter,
        );

        // Assert
        expect(instance1).toBe(instance2);
        expect(mockAxiosCreate).toHaveBeenCalledTimes(1);
      });
    });

    describe('getInstance', () => {
      it('should create instance if not exists', () => {
        // Act
        const instance = ApiClientFactory.getInstance(
          mockHttpTransporter,
          {},
          mockTokenStorage,
          mockTokenManager,
          mockAuthManager,
        );

        // Assert
        expect(instance).toBe(mockAxiosInstance);
        expect(mockAxiosCreate).toHaveBeenCalled();
      });

      it('should return existing instance if already created', () => {
        // Arrange
        ApiClientFactory.create({}, mockTokenStorage, mockTokenManager, mockAuthManager, mockHttpTransporter);
        vi.clearAllMocks();

        // Act
        const instance = ApiClientFactory.getInstance(
          mockHttpTransporter,
          {},
          mockTokenStorage,
          mockTokenManager,
          mockAuthManager,
        );

        // Assert
        expect(instance).toBe(mockAxiosInstance);
        expect(mockAxiosCreate).not.toHaveBeenCalled();
      });
    });

    describe('getHttpTransporter', () => {
      it('should return the stored http transporter', () => {
        // Arrange
        ApiClientFactory.create({}, mockTokenStorage, mockTokenManager, mockAuthManager, mockHttpTransporter);

        // Act
        const transporter = ApiClientFactory.getHttpTransporter();

        // Assert
        expect(transporter).toBe(mockHttpTransporter);
      });
    });

    describe('reset', () => {
      it('should reset instance and http transporter', () => {
        // Arrange
        ApiClientFactory.create({}, mockTokenStorage, mockTokenManager, mockAuthManager, mockHttpTransporter);

        // Act
        ApiClientFactory.reset();

        // Assert
        ApiClientFactory.create({}, mockTokenStorage, mockTokenManager, mockAuthManager, mockHttpTransporter);
        expect(mockAxiosCreate).toHaveBeenCalledTimes(2); // Once before reset, once after
      });
    });
  });

  describe('Interfaces', () => {
    describe('IApiClientConfig', () => {
      it('should allow partial configuration', () => {
        // Arrange & Act
        const config1: IApiClientConfig = {};
        const config2: IApiClientConfig = { baseURL: 'https://api.example.com' };
        const config3: IApiClientConfig = {
          baseURL: 'https://api.example.com',
          timeout: 5000,
          headers: { 'Custom-Header': 'value' },
        };

        // Assert
        expect(config1).toBeDefined();
        expect(config2.baseURL).toBe('https://api.example.com');
        expect(config3.timeout).toBe(5000);
        expect(config3.headers?.['Custom-Header']).toBe('value');
      });
    });

    describe('IResourceAPI', () => {
      it('should define correct method signatures', () => {
        // This test ensures the interface is properly typed
        const mockAPI: IResourceAPI<TestEntity, TestPaginatedEntities, TestCreateEntity, TestUpdateEntity> = {
          getAll: vi.fn(),
          getById: vi.fn(),
          create: vi.fn(),
          update: vi.fn(),
          patch: vi.fn(),
          delete: vi.fn(),
        };

        expect(typeof mockAPI.getAll).toBe('function');
        expect(typeof mockAPI.getById).toBe('function');
        expect(typeof mockAPI.create).toBe('function');
        expect(typeof mockAPI.update).toBe('function');
        expect(typeof mockAPI.patch).toBe('function');
        expect(typeof mockAPI.delete).toBe('function');
      });
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete request flow', () => {
      // This test demonstrates how the components work together
      const mockStorage: IStorage = {
        getAuthToken: vi.fn().mockReturnValue('token'),
        getCompanyId: vi.fn().mockReturnValue('company'),
        setAuthToken: vi.fn(),
        getUser: vi.fn(),
        setUser: vi.fn(),
        setCompanyId: vi.fn(),
        removeStorage: vi.fn(),
        getExpiresIn: vi.fn(),
        setExpiresIn: vi.fn(),
      };

      const mockTokenManager: ITokenManager = {
        isTokenExpiredOrAboutToExpire: vi.fn().mockReturnValue(false),
        decodeToken: vi.fn().mockReturnValue('decodedToken'),
        refreshToken: vi.fn(),
      };

      const mockAuthManager: IAuthManager = {
        signOut: vi.fn(),
      };

      const mockTransporter: IHttpClient = {
        get: vi.fn().mockResolvedValue({ data: [] }),
        post: vi.fn(),
        put: vi.fn(),
        patch: vi.fn(),
        delete: vi.fn(),
      };

      // Create the factory instance
      ApiClientFactory.create({}, mockStorage, mockTokenManager, mockAuthManager, mockTransporter);
    });
  });
});
