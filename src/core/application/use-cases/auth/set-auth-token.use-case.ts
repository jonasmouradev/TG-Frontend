import { ICookieStorage, ICrypto } from '@core/domain';
import { COOKIES, domainName } from '@shared/index';
import { IUseCase } from '@core/domain/use-case.interface';

export class SetAuthTokenUseCase implements IUseCase<string, void> {
  constructor(
    private readonly crypto: ICrypto,
    private readonly storage: ICookieStorage,
  ) {}

  execute(token: string): void {
    const encodedToken = this.crypto.encode(token);
    this.storage.set(COOKIES.AUTH, encodedToken, { expires: 7, domain: domainName });
  }
}
