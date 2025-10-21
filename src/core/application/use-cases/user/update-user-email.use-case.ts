import { User } from '@core/domain';
import { UserGateway, UpdateUserEmailDto } from '@core/domain/gateways/user.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export interface UpdateUserEmailUseCaseInput {
  id: string;
  email: string;
}

export interface UpdateUserEmailUseCaseOutput {
  user: User;
}

export class UpdateUserEmailUseCase implements IUseCase<UpdateUserEmailUseCaseInput, UpdateUserEmailUseCaseOutput> {
  constructor(private userGateway: UserGateway) {}

  async execute(input: UpdateUserEmailUseCaseInput): Promise<UpdateUserEmailUseCaseOutput> {
    const updateUserEmailDto: UpdateUserEmailDto = {
      email: input.email,
    };

    const response = await this.userGateway.updateUserEmail(input.id, updateUserEmailDto);

    if (!response.data) {
      throw new Error('Failed to update user email');
    }

    return {
      user: response.data,
    };
  }
}
