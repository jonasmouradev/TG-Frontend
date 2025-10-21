import { ICookieStorage } from '@core/domain/ports';
import { domainName, links } from '@/shared';
import { IUseCase } from '@core/domain/use-case.interface';

export class SignOutUseCase implements IUseCase<void, void> {
  constructor(private storage: ICookieStorage) {}

  execute(): void {
    this.storage.remove('user', { domain: domainName });
    this.storage.remove('authToken', { domain: domainName });
    this.storage.remove('companyId', { domain: domainName });
    this.storage.remove('expiresIn', { domain: domainName });

    globalThis.location.href = `${links.web}?signout=true`;
  }
}
