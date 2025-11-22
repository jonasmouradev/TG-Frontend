import { User } from '@core/domain';
import { UserGateway } from '@core/domain/gateways/user.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export interface GetMeUseCaseOutput {
  user: User;
}

export class GetMeUseCase implements IUseCase<void, GetMeUseCaseOutput> {
  constructor(private readonly userGateway: UserGateway) {}

  async execute(): Promise<GetMeUseCaseOutput> {
    const response = await this.userGateway.getMe();

    if (!response.data) {
      throw new Error('Failed to get current user');
    }

    return {
      user: response.data,
    };
  }
}
