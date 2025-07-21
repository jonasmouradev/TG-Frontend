import { describe, it, expect, beforeEach, vi, afterEach, type Mock } from 'vitest';
import axios from 'axios';
import { ApiClientFactory } from '../Factory';
import { IStorage } from '../../Storage/interface';
import { ITokenManager } from '../../TokenManager/interface';
import { IAuthManager } from '../../AuthManager/interface';
import { IHttpClient } from '../../Transporter/Http/interface';
import { IApiClientConfig } from '../interfaces';

// Mock axios
vi.mock('axios', () => ({
  default: {
    create: vi.fn(),
  },
}));

const mockAxiosCreate = vi.mocked(axios.create);

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

    // Set up environment variable mock
    vi.stubEnv('VITE_API_URL', 'https://test-api.com');
  });

  afterEach(() => {
    ApiClientFactory.reset();
    vi.clearAllMocks();
    vi.unstubAllEnvs();
  });

  describe('create', () => {
    it('should create a new axios instance with default configuration', () => {
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
        baseURL: 'https://test-api.com',
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      expect(instance).toBe(mockAxiosInstance);
    });

    it('should create axios instance with custom configuration', () => {
      // Arrange
      const config: IApiClientConfig = {
        baseURL: 'https://custom-api.com',
        timeout: 5000,
        headers: {
          'X-API-Version': 'v2',
          Accept: 'application/vnd.api+json',
        },
      };

      // Act
      ApiClientFactory.create(mockTokenStorage, mockTokenManager, mockAuthManager, mockHttpTransporter);

      // Assert
      expect(mockAxiosCreate).toHaveBeenCalledWith({
        baseURL: 'https://custom-api.com',
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
          'X-API-Version': 'v2',
          Accept: 'application/vnd.api+json',
        },
      });
    });

    it('should fall back to /api if no environment variable is set', () => {
      // Arrange
      vi.unstubAllEnvs();

      // Act
      ApiClientFactory.create(mockTokenStorage, mockTokenManager, mockAuthManager, mockHttpTransporter);

      // Assert
      expect(mockAxiosCreate).toHaveBeenCalledWith({
        baseURL: '/api',
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    it('should setup request and response interceptors', () => {
      // Act
      ApiClientFactory.create({}, mockTokenStorage, mockTokenManager, mockAuthManager, mockHttpTransporter);

      // Assert
      expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalledTimes(1);
    });

    it('should store the http transporter', () => {
      // Act
      ApiClientFactory.create(mockTokenStorage, mockTokenManager, mockAuthManager, mockHttpTransporter);

      // Assert
      const storedTransporter = ApiClientFactory.getHttpTransporter();
      expect(storedTransporter).toBe(mockHttpTransporter);
    });

    it('should return the same instance on subsequent calls (singleton)', () => {
      // Act
      const instance1 = ApiClientFactory.create(
        mockTokenStorage,
        mockTokenManager,
        mockAuthManager,
        mockHttpTransporter,
      );

      const instance2 = ApiClientFactory.create(
        { baseURL: 'https://different.com' }, // Different config should be ignored
        mockTokenStorage,
        mockTokenManager,
        mockAuthManager,
        mockHttpTransporter,
      );

      // Assert
      expect(instance1).toBe(instance2);
      expect(mockAxiosCreate).toHaveBeenCalledTimes(1);
    });

    it('should merge custom headers with default headers', () => {
      // Arrange
      const config: IApiClientConfig = {
        headers: {
          Authorization: 'Bearer static-token',
          'X-Client-Version': '1.0.0',
        },
      };

      // Act
      ApiClientFactory.create(config, mockTokenStorage, mockTokenManager, mockAuthManager, mockHttpTransporter);

      // Assert
      expect(mockAxiosCreate).toHaveBeenCalledWith({
        baseURL: 'https://test-api.com',
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer static-token',
          'X-Client-Version': '1.0.0',
        },
      });
    });
  });

  describe('getInstance', () => {
    it('should create instance if it does not exist', () => {
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
      expect(mockAxiosCreate).toHaveBeenCalledTimes(1);
    });

    it('should return existing instance if it already exists', () => {
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

    it('should return undefined if no transporter is stored', () => {
      // Act
      const transporter = ApiClientFactory.getHttpTransporter();

      // Assert
      expect(transporter).toBeUndefined();
    });
  });

  describe('reset', () => {
    it('should reset the singleton instance and transporter', () => {
      // Arrange
      ApiClientFactory.create({}, mockTokenStorage, mockTokenManager, mockAuthManager, mockHttpTransporter);
      expect(ApiClientFactory.getHttpTransporter()).toBe(mockHttpTransporter);

      // Act
      ApiClientFactory.reset();

      // Assert
      // After reset, creating a new instance should call axios.create again
      ApiClientFactory.create({}, mockTokenStorage, mockTokenManager, mockAuthManager, mockHttpTransporter);
      expect(mockAxiosCreate).toHaveBeenCalledTimes(2);
    });

    it('should allow creating a new instance with different config after reset', () => {
      // Arrange
      ApiClientFactory.create(
        { baseURL: 'https://first.com' },
        mockTokenStorage,
        mockTokenManager,
        mockAuthManager,
        mockHttpTransporter,
      );

      // Act
      ApiClientFactory.reset();
      ApiClientFactory.create(
        { baseURL: 'https://second.com' },
        mockTokenStorage,
        mockTokenManager,
        mockAuthManager,
        mockHttpTransporter,
      );

      // Assert
      expect(mockAxiosCreate).toHaveBeenCalledTimes(2);
      expect(mockAxiosCreate).toHaveBeenLastCalledWith({
        baseURL: 'https://second.com',
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  });

  describe('error handling', () => {
    it('should handle axios.create throwing an error', () => {
      // Arrange
      mockAxiosCreate.mockImplementation(() => {
        throw new Error('Failed to create axios instance');
      });

      // Act & Assert
      expect(() =>
        ApiClientFactory.create({}, mockTokenStorage, mockTokenManager, mockAuthManager, mockHttpTransporter),
      ).toThrow('Failed to create axios instance');
    });
  });
});

describe('createResourceAPI', () => {
  let mockHttpTransporter: IHttpClient;

  beforeEach(() => {
    mockHttpTransporter = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    };

    // Mock the factory to return our transporter
    vi.spyOn(ApiClientFactory, 'getHttpTransporter').mockReturnValue(mockHttpTransporter);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});
