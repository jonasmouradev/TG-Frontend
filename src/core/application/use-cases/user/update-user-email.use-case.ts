import { User } from '@core/domain';
import { UserGateway, UpdateUserEmailDto } from '@core/domain/gateways/user.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export interface UpdateUserEmailInput {
  id: string;
  email: string;
}

export interface UpdateUserEmailOutput {
  user: User;
}

export class UpdateUserEmailUseCase implements IUseCase<UpdateUserEmailInput, UpdateUserEmailOutput> {
  constructor(private readonly gateway: UserGateway) {}

  async execute(input: UpdateUserEmailInput): Promise<UpdateUserEmailOutput> {
    const updateUserEmailDto: UpdateUserEmailDto = {
      email: input.email,
    };

    const response = await this.gateway.updateUserEmail(input.id, updateUserEmailDto);

    if (!response.data) {
      throw new Error('Failed to update user email');
    }

    return {
      user: response.data,
    };
  }
}
