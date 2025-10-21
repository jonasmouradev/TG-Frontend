import { User } from '@core/domain';
import { UserGateway } from '@core/domain/gateways/user.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export interface GetCurrentUserUseCaseOutput {
  user: User;
}

export class GetCurrentUserUseCase implements IUseCase<void, GetCurrentUserUseCaseOutput> {
  constructor(private userGateway: UserGateway) {}

  async execute(): Promise<GetCurrentUserUseCaseOutput> {
    const response = await this.userGateway.getCurrentUser();

    if (!response.data) {
      throw new Error('Failed to get current user');
    }

    return {
      user: response.data,
    };
  }
}
