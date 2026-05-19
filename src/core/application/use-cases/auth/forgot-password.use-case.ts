import { AuthGateway, ForgotPasswordDto } from '@core/domain/gateways/auth.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export interface ForgotPasswordUseCaseInput {
  email: string;
}

export interface ForgotPasswordUseCaseOutput {
  message: string;
}

export class ForgotPasswordUseCase implements IUseCase<ForgotPasswordUseCaseInput, ForgotPasswordUseCaseOutput> {
  constructor(private readonly gateway: AuthGateway) {}

  async execute(input: ForgotPasswordUseCaseInput): Promise<ForgotPasswordUseCaseOutput> {
    const forgotPasswordDto: ForgotPasswordDto = {
      email: input.email,
    };

    const response = await this.gateway.forgotPassword(forgotPasswordDto);

    if (!response.data) {
      throw new Error('Failed to send password reset email');
    }

    return {
      message: response.data.message,
    };
  }
}
