import { User } from '@/core/domain';
import { UserGateway, UpdateUserDto } from '@/core/domain/gateways/user.gateway';
import { IUseCase } from '@/core/domain/use-case.interface';

export interface UpdateUserUseCaseInput {
  id: string;
  name?: string;
  email?: string;
  type?: string;
}

export interface UpdateUserUseCaseOutput {
  user: User;
}

export class UpdateUserUseCase implements IUseCase<UpdateUserUseCaseInput, UpdateUserUseCaseOutput> {
  constructor(private userGateway: UserGateway) {}

  async execute(input: UpdateUserUseCaseInput): Promise<UpdateUserUseCaseOutput> {
    const { id, ...updateData } = input;

    const updateUserDto: UpdateUserDto = {
      name: updateData.name,
      email: updateData.email,
      type: updateData.type,
    };

    const response = await this.userGateway.updateUser(id, updateUserDto);

    if (!response.data) {
      throw new Error('Failed to update user');
    }

    return {
      user: response.data,
    };
  }
}
