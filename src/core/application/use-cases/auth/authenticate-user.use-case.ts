import { AuthGateway, SignInDto } from '@core/domain/gateways/auth.gateway';
import { IUseCase } from '@core/domain/use-case.interface';
import { IUser } from '@shared/types';

export interface AuthenticateUserUseCaseInput {
  email: string;
  password: string;
}

export interface AuthenticateUserUseCaseOutput {
  accessToken: string;
  user: IUser;
  expiresIn: string;
}

export class AuthenticateUserUseCase implements IUseCase<AuthenticateUserUseCaseInput, AuthenticateUserUseCaseOutput> {
  constructor(private readonly gateway: AuthGateway) {}

  async execute(input: AuthenticateUserUseCaseInput): Promise<AuthenticateUserUseCaseOutput> {
    const signInDto: SignInDto = {
      email: input.email,
      password: input.password,
    };

    const response = await this.gateway.signIn(signInDto);

    if (!response.data) {
      throw new Error('Authentication failed');
    }

    return {
      accessToken: response.data.accessToken,
      user: response.data.user,
      expiresIn: response.data.expiresIn,
    };
  }
}
