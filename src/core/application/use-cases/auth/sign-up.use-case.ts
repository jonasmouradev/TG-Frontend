import { AuthGateway, SignUpDto } from '@core/domain/gateways/auth.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export interface SignUpUseCaseInput {
  username: string;
  name: string;
  email: string;
  password: string;
  type: string;
}

export interface SignUpUseCaseOutput {
  status: number;
}

export class SignUpUseCase implements IUseCase<SignUpUseCaseInput, SignUpUseCaseOutput> {
  constructor(private readonly authGateway: AuthGateway) {}

  async execute(input: SignUpUseCaseInput): Promise<SignUpUseCaseOutput> {
    const signUpDto: SignUpDto = {
      name: input.name,
      email: input.email,
      password: input.password,
      type: input.type,
      username: input.username,
    };

    const response = await this.authGateway.signUp(signUpDto);

    return {
      status: response.status,
    };
  }
}
