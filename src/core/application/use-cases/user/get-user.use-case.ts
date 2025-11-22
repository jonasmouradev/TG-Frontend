import { User } from '@core/domain';
import { UserGateway } from '@core/domain/gateways/user.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export interface GetUserInput {
  id: string;
}

export interface GetUserOutput {
  user: User;
}

export class GetUserUseCase implements IUseCase<GetUserInput, GetUserOutput> {
  constructor(private readonly gateway: UserGateway) {}

  async execute(input: GetUserInput): Promise<GetUserOutput> {
    const response = await this.gateway.getUser(input.id);

    if (!response.data) {
      throw new Error('User not found');
    }

    return {
      user: response.data,
    };
  }
}
