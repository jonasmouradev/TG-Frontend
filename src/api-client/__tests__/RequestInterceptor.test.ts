import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import { RequestInterceptor } from '../Interceptors/Request';
import { InternalAxiosRequestConfig } from 'axios';
import { IStorage } from '../../Storage/interface';
import { ITokenManager } from '../../TokenManager/interface';
import { IAuthManager } from '../../AuthManager/interface';

// Mock the constants
vi.mock('@/utils/constants', () => ({
  COMPANY_ID_EXCEPTIONS: ['/api/auth/login', '/api/auth/register'],
}));

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
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with storage, token manager and auth manager', () => {
      expect(requestInterceptor).toBeInstanceOf(RequestInterceptor);
    });
  });

  describe('handleRequest', () => {
    const createMockRequest = (url = '/api/test'): InternalAxiosRequestConfig => ({
      url,
      headers: {} as InternalAxiosRequestConfig['headers'],
      method: 'GET',
    });

    it('should return request unchanged for refresh-token requests', async () => {
      // Arrange
      const refreshRequest = createMockRequest('/api/auth/refresh-token');

      // Act
      const result = await requestInterceptor.handleRequest(refreshRequest);

      // Assert
      expect(result).toEqual(refreshRequest);
      expect(mockTokenStorage.getAuthToken).not.toHaveBeenCalled();
    });

    it('should add authorization and companyId headers for valid non-expired token', async () => {
      // Arrange
      const request = createMockRequest('/api/users');
      (mockTokenStorage.getAuthToken as Mock).mockReturnValue('raw-token');
      (mockTokenStorage.getCompanyId as Mock).mockReturnValue('company-123');
      (mockTokenManager.decodeToken as Mock).mockReturnValue('decoded-token');
      (mockTokenManager.isTokenExpiredOrAboutToExpire as Mock).mockReturnValue(false);

      // Act
      const result = await requestInterceptor.handleRequest(request);

      // Assert
      expect(result.headers.Authorization).toBe('Bearer decoded-token');
      expect(result.headers.companyId).toBe('company-123');
      expect(mockTokenManager.refreshToken).not.toHaveBeenCalled();
    });

    it('should refresh token when current token is expired', async () => {
      // Arrange
      const request = createMockRequest('/api/users');
      (mockTokenStorage.getAuthToken as Mock).mockReturnValue('expired-token');
      (mockTokenManager.decodeToken as Mock).mockReturnValue('decoded-expired-token');
      (mockTokenManager.isTokenExpiredOrAboutToExpire as Mock).mockReturnValue(true);
      (mockTokenManager.refreshToken as Mock).mockResolvedValue('new-fresh-token');

      // Act
      const result = await requestInterceptor.handleRequest(request);

      // Assert
      expect(mockTokenManager.refreshToken).toHaveBeenCalledTimes(1);
      expect(mockTokenStorage.setAuthToken).toHaveBeenCalledWith('new-fresh-token');
      expect(result.headers.Authorization).toBe('Bearer new-fresh-token');
    });

    it('should sign out when token decoding fails', async () => {
      // Arrange
      const request = createMockRequest('/api/users');
      (mockTokenStorage.getAuthToken as Mock).mockReturnValue('invalid-token');
      (mockTokenManager.decodeToken as Mock).mockImplementation(() => {
        throw new Error('Invalid token format');
      });

      // Act
      const result = await requestInterceptor.handleRequest(request);

      // Assert
      expect(mockAuthManager.signOut).toHaveBeenCalledTimes(1);
      expect(result).toEqual(request);
    });

    it('should sign out when token refresh fails', async () => {
      // Arrange
      const request = createMockRequest('/api/users');
      (mockTokenStorage.getAuthToken as Mock).mockReturnValue('expired-token');
      (mockTokenManager.decodeToken as Mock).mockReturnValue('decoded-expired-token');
      (mockTokenManager.isTokenExpiredOrAboutToExpire as Mock).mockReturnValue(true);
      (mockTokenManager.refreshToken as Mock).mockRejectedValue(new Error('Refresh failed'));

      // Act
      const result = await requestInterceptor.handleRequest(request);

      // Assert
      expect(mockAuthManager.signOut).toHaveBeenCalledTimes(1);
      expect(result).toEqual(request);
    });

    it('should attempt token refresh when no token exists', async () => {
      // Arrange
      const request = createMockRequest('/api/users');
      (mockTokenStorage.getAuthToken as Mock).mockReturnValue(null);
      (mockTokenManager.refreshToken as Mock).mockResolvedValue('new-token');

      // Act
      const result = await requestInterceptor.handleRequest(request);

      // Assert
      expect(mockTokenManager.refreshToken).toHaveBeenCalledTimes(1);
      expect(mockTokenStorage.setAuthToken).toHaveBeenCalledWith('new-token');
      expect(result.headers.Authorization).toBe('Bearer new-token');
    });

    it('should sign out when no token exists and refresh fails', async () => {
      // Arrange
      const request = createMockRequest('/api/users');
      (mockTokenStorage.getAuthToken as Mock).mockReturnValue(null);
      (mockTokenManager.refreshToken as Mock).mockRejectedValue(new Error('No refresh token'));

      // Act
      const result = await requestInterceptor.handleRequest(request);

      // Assert
      expect(mockAuthManager.signOut).toHaveBeenCalledTimes(1);
      expect(result).toEqual(request);
    });

    it('should not add companyId header for exception endpoints', async () => {
      // Arrange
      const request = createMockRequest('/api/auth/login');
      (mockTokenStorage.getAuthToken as Mock).mockReturnValue('valid-token');
      (mockTokenStorage.getCompanyId as Mock).mockReturnValue('company-123');
      (mockTokenManager.decodeToken as Mock).mockReturnValue('decoded-token');
      (mockTokenManager.isTokenExpiredOrAboutToExpire as Mock).mockReturnValue(false);

      // Act
      const result = await requestInterceptor.handleRequest(request);

      // Assert
      expect(result.headers.Authorization).toBe('Bearer decoded-token');
      expect(result.headers.companyId).toBeUndefined();
    });

    it('should add companyId header for non-exception endpoints', async () => {
      // Arrange
      const request = createMockRequest('/api/users');
      (mockTokenStorage.getAuthToken as Mock).mockReturnValue('valid-token');
      (mockTokenStorage.getCompanyId as Mock).mockReturnValue('company-123');
      (mockTokenManager.decodeToken as Mock).mockReturnValue('decoded-token');
      (mockTokenManager.isTokenExpiredOrAboutToExpire as Mock).mockReturnValue(false);

      // Act
      const result = await requestInterceptor.handleRequest(request);

      // Assert
      expect(result.headers.Authorization).toBe('Bearer decoded-token');
      expect(result.headers.companyId).toBe('company-123');
    });

    it('should handle empty token string', async () => {
      // Arrange
      const request = createMockRequest('/api/users');
      (mockTokenStorage.getAuthToken as Mock).mockReturnValue('');
      (mockTokenManager.refreshToken as Mock).mockResolvedValue('new-token');

      // Act
      const result = await requestInterceptor.handleRequest(request);

      // Assert
      expect(mockTokenManager.refreshToken).toHaveBeenCalledTimes(1);
      expect(result.headers.Authorization).toBe('Bearer new-token');
    });

    it('should handle missing companyId', async () => {
      // Arrange
      const request = createMockRequest('/api/users');
      (mockTokenStorage.getAuthToken as Mock).mockReturnValue('valid-token');
      (mockTokenStorage.getCompanyId as Mock).mockReturnValue(null);
      (mockTokenManager.decodeToken as Mock).mockReturnValue('decoded-token');
      (mockTokenManager.isTokenExpiredOrAboutToExpire as Mock).mockReturnValue(false);

      // Act
      const result = await requestInterceptor.handleRequest(request);

      // Assert
      expect(result.headers.Authorization).toBe('Bearer decoded-token');
      expect(result.headers.companyId).toBeUndefined();
    });

    it('should preserve existing headers', async () => {
      // Arrange
      const request: InternalAxiosRequestConfig = {
        url: '/api/users',
        headers: {} as InternalAxiosRequestConfig['headers'],
      };
      request.headers!['Content-Type'] = 'application/json';
      request.headers!['Custom-Header'] = 'custom-value';
      (mockTokenStorage.getAuthToken as Mock).mockReturnValue('valid-token');
      (mockTokenStorage.getCompanyId as Mock).mockReturnValue('company-123');
      (mockTokenManager.decodeToken as Mock).mockReturnValue('decoded-token');
      (mockTokenManager.isTokenExpiredOrAboutToExpire as Mock).mockReturnValue(false);

      // Act
      const result = await requestInterceptor.handleRequest(request);

      // Assert
      expect(result.headers['Content-Type']).toBe('application/json');
      expect(result.headers['Custom-Header']).toBe('custom-value');
      expect(result.headers.Authorization).toBe('Bearer decoded-token');
      expect(result.headers.companyId).toBe('company-123');
    });

    it('should handle partial refresh-token URL matches', async () => {
      // Arrange
      const request = createMockRequest('/api/auth/refresh-token-extended');

      // Act
      const result = await requestInterceptor.handleRequest(request);

      // Assert
      expect(result).toEqual(request);
      expect(mockTokenStorage.getAuthToken).not.toHaveBeenCalled();
    });

    it('should handle different refresh-token URL patterns', async () => {
      // Test different refresh token URL patterns
      const refreshUrls = ['/api/refresh-token', '/auth/refresh-token', '/v1/refresh-token', '/api/auth/refresh-token'];

      for (const url of refreshUrls) {
        const request = createMockRequest(url);
        const result = await requestInterceptor.handleRequest(request);
        expect(result).toEqual(request);
        expect(mockTokenStorage.getAuthToken).not.toHaveBeenCalled();
        vi.clearAllMocks();
      }
    });
  });
});
