import { ICrypto, ICookieStorage } from '@core/domain/ports';
import { IUseCase } from '@core/domain/use-case.interface';
import { COOKIES } from '@shared/utils';

export class GetCompanyIdUseCase implements IUseCase<null, string | null> {
  constructor(
    private readonly crypto: ICrypto,
    private readonly storage: ICookieStorage,
  ) {}

  execute(): string | null {
    const encodedUser = this.storage.get(COOKIES.USER);

    if (!encodedUser) {
      return null;
    }

    try {
      const user = JSON.parse(this.crypto.decode(encodedUser));

      if (user?.type === 'PERSON') {
        return this.storage.get(COOKIES.COMPANY_ID);
      }

      return user?.profileId || null;
    } catch {
      return null;
    }
  }
}
