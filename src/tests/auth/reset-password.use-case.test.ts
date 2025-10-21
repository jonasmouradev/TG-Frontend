import { describe, it, expect, vi } from 'vitest';
import { ResetPasswordUseCase } from '@/core/application/use-cases/auth/reset-password.use-case';
import { AuthGateway } from '@/core/domain/gateways/auth.gateway';

describe('ResetPasswordUseCase', () => {
  it('should reset password successfully', async () => {
    // Arrange
    const mockAuthGateway: AuthGateway = {
      signIn: vi.fn(),
      signUp: vi.fn(),
      forgotPassword: vi.fn(),
      resetPassword: vi.fn().mockResolvedValue({
        data: { message: 'Password reset successfully' },
        error: null,
      }),
      checkSecretKey: vi.fn(),
      logout: vi.fn(),
      refreshToken: vi.fn(),
    };

    const useCase = new ResetPasswordUseCase(mockAuthGateway);
    const input = {
      secretKey: 'test-secret-key',
      newPassword: 'newPassword123',
    };

    // Act
    const result = await useCase.execute(input);

    // Assert
    expect(result).toEqual({
      message: 'Password reset successfully',
    });
    expect(mockAuthGateway.resetPassword).toHaveBeenCalledWith({
      secretKey: 'test-secret-key',
      newPassword: 'newPassword123',
    });
  });

  it('should throw error when reset password fails', async () => {
    // Arrange
    const mockAuthGateway: AuthGateway = {
      signIn: vi.fn(),
      signUp: vi.fn(),
      forgotPassword: vi.fn(),
      resetPassword: vi.fn().mockResolvedValue({
        data: null,
        error: { message: 'Invalid secret key' },
      }),
      checkSecretKey: vi.fn(),
      logout: vi.fn(),
      refreshToken: vi.fn(),
    };

    const useCase = new ResetPasswordUseCase(mockAuthGateway);
    const input = {
      secretKey: 'invalid-secret-key',
      newPassword: 'newPassword123',
    };

    // Act & Assert
    await expect(useCase.execute(input)).rejects.toThrow('Failed to reset password');
    expect(mockAuthGateway.resetPassword).toHaveBeenCalledWith({
      secretKey: 'invalid-secret-key',
      newPassword: 'newPassword123',
    });
  });
});
