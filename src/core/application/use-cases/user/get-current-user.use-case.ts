import { User } from '@core/domain';
import { UserGateway } from '@core/domain/gateways/user.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export type GetMeInput = void;

export interface GetMeOutput {
  user: User;
}

export class GetMeUseCase implements IUseCase<GetMeInput, GetMeOutput> {
  constructor(private readonly gateway: UserGateway) {}

  async execute(): Promise<GetMeOutput> {
    const response = await this.gateway.getMe();

    if (!response.data) {
      throw new Error('Failed to get current user');
    }

    return {
      user: response.data,
    };
  }
}
