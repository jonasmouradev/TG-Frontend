import { ICookieStorage, ICrypto } from '@core/domain';
import { domainName } from '@/shared';
import { IUseCase } from '@core/domain/use-case.interface';

export class SetAuthTokenUseCase implements IUseCase<string, void> {
  constructor(
    private crypto: ICrypto,
    private storage: ICookieStorage,
  ) {}

  execute(token: string): void {
    const encodedToken = this.crypto.encode(token);
    this.storage.set('authToken', encodedToken, { expires: 7, domain: domainName });
  }
}
