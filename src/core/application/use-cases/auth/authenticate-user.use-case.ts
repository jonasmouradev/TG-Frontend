import { AuthGateway, SignInDto } from '@core/domain/gateways/auth.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export interface AuthenticateUserUseCaseInput {
  email: string;
  password: string;
}

export interface AuthenticateUserUseCaseOutput {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    type: string;
  };
  expiresIn: string;
}

export class AuthenticateUserUseCase implements IUseCase<AuthenticateUserUseCaseInput, AuthenticateUserUseCaseOutput> {
  constructor(private readonly authGateway: AuthGateway) {}

  async execute(input: AuthenticateUserUseCaseInput): Promise<AuthenticateUserUseCaseOutput> {
    const signInDto: SignInDto = {
      email: input.email,
      password: input.password,
    };

    const response = await this.authGateway.signIn(signInDto);

    if (!response.data) {
      throw new Error('Authentication failed');
    }

    return {
      accessToken: response.data.token,
      user: response.data.user,
      expiresIn: response.data.expiresIn,
    };
  }
}
