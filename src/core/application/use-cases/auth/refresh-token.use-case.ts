import { AuthGateway } from '@core/domain/gateways/auth.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RefreshTokenUseCaseInput {}

export interface RefreshTokenUseCaseOutput {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    type: string;
  };
  expiresIn: string;
}

export class RefreshTokenUseCase implements IUseCase<RefreshTokenUseCaseInput, RefreshTokenUseCaseOutput> {
  constructor(private readonly authGateway: AuthGateway) {}

  async execute(): Promise<RefreshTokenUseCaseOutput> {
    const response = await this.authGateway.refreshToken();

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
