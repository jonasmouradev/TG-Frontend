import { IUser, domainName } from '@/shared';
import { ICrypto, ICookieStorage } from '@core/domain/ports';
import { IUseCase } from '@core/domain/use-case.interface';

export interface SignInUseCaseInput {
  token: string;
  user: IUser;
  expiresIn: string | number;
  companyId?: string;
}

export class SignInUseCase implements IUseCase<SignInUseCaseInput, void> {
  constructor(
    private crypto: ICrypto,
    private storage: ICookieStorage,
  ) {}

  execute(input: SignInUseCaseInput): void {
    // Set authentication token
    const encodedToken = this.crypto.encode(input.token);
    this.storage.set('authToken', encodedToken, { expires: 7, domain: domainName });

    // Set user data
    const encodedUser = this.crypto.encode(JSON.stringify(input.user));
    this.storage.set('user', encodedUser, { expires: 7, domain: domainName });

    // Set expiration
    const encodedExpiresIn = this.crypto.encode(input.expiresIn.toString());
    this.storage.set('expiresIn', encodedExpiresIn, { expires: 7, domain: domainName });

    // Set company ID if provided
    if (input.companyId) {
      this.storage.set('companyId', input.companyId, { expires: 7 });
    }
  }
}
