import { describe, it, expect, vi } from 'vitest';
import { GetUserUseCase } from '@core/application/use-cases/user/get-user.use-case';
import { UserGateway } from '@core/domain/gateways/user.gateway';
import { User } from '@core/domain';

describe('GetUserUseCase', () => {
  it('should get user successfully', async () => {
    // Arrange
    const mockUser = new User({
      id: 'user-123',
      username: 'johndoe',
      name: 'John Doe',
      email: 'john@example.com',
      type: 'COMPANY',
      profile_id: 'profile-123',
      config: {
        auth2f: false,
        default_interface: 'LIGHT',
        default_language: 'en',
        default_timezone: 'UTC',
        layout_name: 'default',
        master: false,
      },
    });

    const mockUserGateway: UserGateway = {
      getMe: vi.fn(),
      getUser: vi.fn().mockResolvedValue({
        data: mockUser,
        error: null,
      }),
      getAllUsers: vi.fn(),
      updateUser: vi.fn(),
      updateUserEmail: vi.fn(),
      deleteUser: vi.fn(),
    };

    const useCase = new GetUserUseCase(mockUserGateway);
    const input = { id: 'user-123' };

    // Act
    const result = await useCase.execute(input);

    // Assert
    expect(result).toEqual({ user: mockUser });
    expect(mockUserGateway.getUser).toHaveBeenCalledWith('user-123');
  });

  it('should throw error when user not found', async () => {
    // Arrange
    const mockUserGateway: UserGateway = {
      getMe: vi.fn(),
      getUser: vi.fn().mockResolvedValue({
        data: null,
        error: { message: 'User not found' },
      }),
      getAllUsers: vi.fn(),
      updateUser: vi.fn(),
      updateUserEmail: vi.fn(),
      deleteUser: vi.fn(),
    };

    const useCase = new GetUserUseCase(mockUserGateway);
    const input = { id: 'invalid-id' };

    // Act & Assert
    await expect(useCase.execute(input)).rejects.toThrow('User not found');
    expect(mockUserGateway.getUser).toHaveBeenCalledWith('invalid-id');
  });
});
