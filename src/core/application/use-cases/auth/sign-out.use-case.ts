import { IUseCase, ICookieStorage } from '@core/domain';
import { COOKIES, domainName, paths } from '@shared/index';

export class SignOutUseCase implements IUseCase<void, void> {
  constructor(private readonly storage: ICookieStorage) {}

  execute(): void {
    this.storage.remove(COOKIES.USER, { domain: domainName });
    this.storage.remove(COOKIES.AUTH, { domain: domainName });
    this.storage.remove(COOKIES.COMPANY_ID, { domain: domainName });
    this.storage.remove(COOKIES.EXPIRES_IN, { domain: domainName });

    globalThis.location.href = paths.SIGN_IN;
  }
}
