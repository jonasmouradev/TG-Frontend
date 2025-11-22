import { User } from '@core/domain';
import { UserGateway, UpdateUserDto } from '@core/domain/gateways/user.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export interface UpdateUserInput {
  id: string;
  name?: string;
  email?: string;
  type?: string;
}

export interface UpdateUserOutput {
  user: User;
}

export class UpdateUserUseCase implements IUseCase<UpdateUserInput, UpdateUserOutput> {
  constructor(private readonly gateway: UserGateway) {}

  async execute(input: UpdateUserInput): Promise<UpdateUserOutput> {
    const { id, ...updateData } = input;

    const updateUserDto: UpdateUserDto = {
      name: updateData.name,
      email: updateData.email,
      type: updateData.type,
    };

    const response = await this.gateway.updateUser(id, updateUserDto);

    if (!response.data) {
      throw new Error('Failed to update user');
    }

    return {
      user: response.data,
    };
  }
}
