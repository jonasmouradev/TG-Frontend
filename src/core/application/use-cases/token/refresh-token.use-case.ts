import { AuthGateway } from '@core/domain/gateways/auth.gateway';
import { IUseCase } from '@core/domain/use-case.interface';
import { IUser } from '@shared/types';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RefreshTokenUseCaseInput {}

export interface RefreshTokenUseCaseOutput {
  token: string;
  user: IUser;
  expiresIn: string;
}

export class RefreshTokenUseCase implements IUseCase<RefreshTokenUseCaseInput, RefreshTokenUseCaseOutput> {
  constructor(private readonly gateway: AuthGateway) {}

  async execute(): Promise<RefreshTokenUseCaseOutput> {
    const response = await this.gateway.refreshToken();

    if (!response.data) {
      throw new Error('Failed to refresh token');
    }

    return {
      token: response.data.accessToken,
      user: response.data.user,
      expiresIn: response.data.expiresIn,
    };
  }
}
