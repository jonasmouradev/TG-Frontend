import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import { ResponseInterceptor } from '../Interceptors/Response';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { IStorage } from '../../Storage/interface';
import { IAuthManager } from '../../AuthManager/interface';

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

  describe('constructor', () => {
    it('should initialize with storage and auth manager', () => {
      expect(responseInterceptor).toBeInstanceOf(ResponseInterceptor);
    });
  });

  describe('handleResponse', () => {
    it('should return response unchanged for successful requests', () => {
      // Arrange
      const mockResponse: AxiosResponse = {
        status: 200,
        statusText: 'OK',
        data: { message: 'Success' },
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      // Act
      const result = responseInterceptor.handleResponse(mockResponse);

      // Assert
      expect(result).toBe(mockResponse);
      expect(mockAuthManager.signOut).not.toHaveBeenCalled();
    });

    it('should return response unchanged for 401 without token', () => {
      // Arrange
      (mockTokenStorage.getAuthToken as Mock).mockReturnValue(null);
      const mockResponse: AxiosResponse = {
        status: 401,
        statusText: 'Unauthorized',
        data: { error: 'Unauthorized' },
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      // Act
      const result = responseInterceptor.handleResponse(mockResponse);

      // Assert
      expect(result).toBe(mockResponse);
      expect(mockAuthManager.signOut).not.toHaveBeenCalled();
    });

    it('should sign out when receiving 401 with valid token', () => {
      // Arrange
      (mockTokenStorage.getAuthToken as Mock).mockReturnValue('valid-token');
      const mockResponse: AxiosResponse = {
        status: 401,
        statusText: 'Unauthorized',
        data: { error: 'Token expired' },
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      // Act
      const result = responseInterceptor.handleResponse(mockResponse);

      // Assert
      expect(result).toBe(mockResponse);
      expect(mockAuthManager.signOut).toHaveBeenCalledTimes(1);
    });

    it('should not sign out for other 4xx errors with token', () => {
      // Arrange
      (mockTokenStorage.getAuthToken as Mock).mockReturnValue('valid-token');
      const mockResponse: AxiosResponse = {
        status: 403,
        statusText: 'Forbidden',
        data: { error: 'Access denied' },
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      // Act
      const result = responseInterceptor.handleResponse(mockResponse);

      // Assert
      expect(result).toBe(mockResponse);
      expect(mockAuthManager.signOut).not.toHaveBeenCalled();
    });

    it('should not sign out for 5xx errors with token', () => {
      // Arrange
      (mockTokenStorage.getAuthToken as Mock).mockReturnValue('valid-token');
      const mockResponse: AxiosResponse = {
        status: 500,
        statusText: 'Internal Server Error',
        data: { error: 'Server error' },
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      // Act
      const result = responseInterceptor.handleResponse(mockResponse);

      // Assert
      expect(result).toBe(mockResponse);
      expect(mockAuthManager.signOut).not.toHaveBeenCalled();
    });

    it('should handle empty token (empty string)', () => {
      // Arrange
      (mockTokenStorage.getAuthToken as Mock).mockReturnValue('');
      const mockResponse: AxiosResponse = {
        status: 401,
        statusText: 'Unauthorized',
        data: { error: 'Unauthorized' },
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      // Act
      const result = responseInterceptor.handleResponse(mockResponse);

      // Assert
      expect(result).toBe(mockResponse);
      expect(mockAuthManager.signOut).not.toHaveBeenCalled();
    });

    it('should handle whitespace token', () => {
      // Arrange
      (mockTokenStorage.getAuthToken as Mock).mockReturnValue('   ');
      const mockResponse: AxiosResponse = {
        status: 401,
        statusText: 'Unauthorized',
        data: { error: 'Unauthorized' },
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      // Act
      const result = responseInterceptor.handleResponse(mockResponse);

      // Assert
      expect(result).toBe(mockResponse);
      expect(mockAuthManager.signOut).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple consecutive 401s with token', () => {
      // Arrange
      (mockTokenStorage.getAuthToken as Mock).mockReturnValue('valid-token');
      const mockResponse: AxiosResponse = {
        status: 401,
        statusText: 'Unauthorized',
        data: { error: 'Token expired' },
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      // Act
      responseInterceptor.handleResponse(mockResponse);
      responseInterceptor.handleResponse(mockResponse);

      // Assert
      expect(mockAuthManager.signOut).toHaveBeenCalledTimes(2);
    });
  });
});
