import { AuthGateway, SignUpDto } from '@/core/domain/gateways/auth.gateway';
import { IUseCase } from '@/core/domain/use-case.interface';

export interface SignUpUseCaseInput {
  name: string;
  email: string;
  password: string;
  type: string;
}

export interface SignUpUseCaseOutput {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    type: string;
  };
  expiresIn: string;
}

export class SignUpUseCase implements IUseCase<SignUpUseCaseInput, SignUpUseCaseOutput> {
  constructor(private authGateway: AuthGateway) {}

  async execute(input: SignUpUseCaseInput): Promise<SignUpUseCaseOutput> {
    const signUpDto: SignUpDto = {
      name: input.name,
      email: input.email,
      password: input.password,
      type: input.type,
    };

    const response = await this.authGateway.signUp(signUpDto);

    if (!response.data) {
      throw new Error('Sign up failed');
    }

    return {
      token: response.data.token,
      user: response.data.user,
      expiresIn: response.data.expiresIn,
    };
  }
}
