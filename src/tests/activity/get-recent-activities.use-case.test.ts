import { GetRecentActivitiesUseCase } from '@/core/application/use-cases/activity/get-recent-activities.use-case';
import { HttpStatusCode } from '@/core/domain';
import { ActivityGateway } from '@/core/domain/gateways/activity.gateway';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';

describe('GetRecentActivitiesUseCase', () => {
  let useCase: GetRecentActivitiesUseCase;
  let mockActivityGateway: Mocked<ActivityGateway>;

  beforeEach(() => {
    mockActivityGateway = {
      getRecentActivities: vi.fn(),
      getRecruitmentProcesses: vi.fn(),
      getRecruitmentProcessById: vi.fn(),
    };
    useCase = new GetRecentActivitiesUseCase(mockActivityGateway);
  });

  it('should return activities successfully', async () => {
    // Arrange
    const mockResponse = {
      data: {
        activities: [
          {
            id: '1',
            message: 'Test activity',
            type: 'application' as const,
            timestamp: '2024-01-01T00:00:00Z',
          },
        ],
        totalCount: 1,
      },
      status: 200 as HttpStatusCode,
      statusText: 'OK',
      headers: {},
    };

    mockActivityGateway.getRecentActivities.mockResolvedValue(mockResponse);

    // Act
    const result = await useCase.execute({ limit: 10 });

    // Assert
    expect(result).toEqual({
      activities: [
        {
          id: '1',
          message: 'Test activity',
          type: 'application',
          timestamp: '2024-01-01T00:00:00Z',
        },
      ],
      totalCount: 1,
    });
    expect(mockActivityGateway.getRecentActivities).toHaveBeenCalledWith({
      limit: 10,
      companyId: undefined,
    });
  });

  it('should throw error when gateway returns null data', async () => {
    // Arrange
    const mockResponse = {
      data: null,
      status: 500 as HttpStatusCode,
      statusText: 'Internal Server Error',
      headers: {},
    };

    mockActivityGateway.getRecentActivities.mockResolvedValue(mockResponse);

    // Act & Assert
    await expect(useCase.execute({ limit: 10 })).rejects.toThrow('Failed to get recent activities');
  });
});
