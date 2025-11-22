import { AuthGateway, ResetPasswordDto } from '@core/domain/gateways/auth.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export interface ResetPasswordUseCaseInput {
  secretKey: string;
  newPassword: string;
}

export interface ResetPasswordUseCaseOutput {
  message: string;
}

export class ResetPasswordUseCase implements IUseCase<ResetPasswordUseCaseInput, ResetPasswordUseCaseOutput> {
  constructor(private readonly gateway: AuthGateway) {}

  async execute(input: ResetPasswordUseCaseInput): Promise<ResetPasswordUseCaseOutput> {
    const resetPasswordDto: ResetPasswordDto = {
      secretKey: input.secretKey,
      newPassword: input.newPassword,
    };

    const response = await this.gateway.resetPassword(resetPasswordDto);

    if (!response.data) {
      throw new Error('Failed to reset password');
    }

    return {
      message: response.data.message,
    };
  }
}
