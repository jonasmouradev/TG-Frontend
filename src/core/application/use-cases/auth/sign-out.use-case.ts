import { ICookieStorage } from '@core/domain/ports';
import { COOKIES, domainName, paths } from '@shared/index';
import { IUseCase } from '@core/domain/use-case.interface';

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
