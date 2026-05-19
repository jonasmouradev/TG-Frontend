import { describe, it, expect, vi } from 'vitest';
import { RefreshTokenUseCase } from '@core/application/use-cases/token/refresh-token.use-case';
import { AuthGateway } from '@core/domain/gateways/auth.gateway';

describe('RefreshTokenUseCase', () => {
  it('should refresh token successfully', async () => {
    // Arrange
    const mockResponse = {
      data: {
        token: 'new-jwt-token',
        user: {
          id: 'user-123',
          name: 'John Doe',
          email: 'john@example.com',
          type: 'company',
        },
        expiresIn: '3600s',
      },
      error: null,
    };

    const mockAuthGateway: AuthGateway = {
      signIn: vi.fn(),
      signUp: vi.fn(),
      forgotPassword: vi.fn(),
      resetPassword: vi.fn(),
      checkSecretKey: vi.fn(),
      logout: vi.fn(),
      refreshToken: vi.fn().mockResolvedValue(mockResponse),
    };

    const useCase = new RefreshTokenUseCase(mockAuthGateway);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(result).toEqual({
      token: 'new-jwt-token',
      user: {
        id: 'user-123',
        name: 'John Doe',
        email: 'john@example.com',
        type: 'company',
      },
      expiresIn: '3600s',
    });
    expect(mockAuthGateway.refreshToken).toHaveBeenCalledTimes(1);
  });

  it('should throw error when refresh token fails', async () => {
    // Arrange
    const mockAuthGateway: AuthGateway = {
      signIn: vi.fn(),
      signUp: vi.fn(),
      forgotPassword: vi.fn(),
      resetPassword: vi.fn(),
      checkSecretKey: vi.fn(),
      logout: vi.fn(),
      refreshToken: vi.fn().mockResolvedValue({
        data: null,
        error: { message: 'Invalid refresh token' },
      }),
    };

    const useCase = new RefreshTokenUseCase(mockAuthGateway);

    // Act & Assert
    await expect(useCase.execute()).rejects.toThrow('Failed to refresh token');
    expect(mockAuthGateway.refreshToken).toHaveBeenCalledTimes(1);
  });
});
