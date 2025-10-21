import { User } from '@core/domain';
import { UserGateway } from '@core/domain/gateways/user.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export interface GetUserUseCaseInput {
  id: string;
}

export interface GetUserUseCaseOutput {
  user: User;
}

export class GetUserUseCase implements IUseCase<GetUserUseCaseInput, GetUserUseCaseOutput> {
  constructor(private userGateway: UserGateway) {}

  async execute(input: GetUserUseCaseInput): Promise<GetUserUseCaseOutput> {
    const response = await this.userGateway.getUser(input.id);

    if (!response.data) {
      throw new Error('User not found');
    }

    return {
      user: response.data,
    };
  }
}
