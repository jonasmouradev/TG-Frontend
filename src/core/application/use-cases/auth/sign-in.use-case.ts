import { COOKIES, IUser, domainName } from '@shared/index';
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
    private readonly crypto: ICrypto,
    private readonly storage: ICookieStorage,
  ) {}

  execute(input: SignInUseCaseInput): void {
    const encodedToken = this.crypto.encode(input.token);
    this.storage.set(COOKIES.AUTH, encodedToken, { expires: 7, domain: domainName });

    const encodedUser = this.crypto.encode(JSON.stringify(input.user));
    this.storage.set(COOKIES.USER, encodedUser, { expires: 7, domain: domainName });

    const encodedExpiresIn = this.crypto.encode(input.expiresIn.toString());
    this.storage.set(COOKIES.EXPIRES_IN, encodedExpiresIn, { expires: 7, domain: domainName });

    if (input.companyId) {
      this.storage.set(COOKIES.COMPANY_ID, input.companyId, { expires: 7, domain: domainName });
    }
  }
}
