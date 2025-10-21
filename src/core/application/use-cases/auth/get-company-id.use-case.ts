import { ICrypto, ICookieStorage } from '@/core/domain/ports';
import { IUseCase } from '@/core/domain/use-case.interface';

export class GetCompanyIdUseCase implements IUseCase<null, string | null> {
  constructor(
    private crypto: ICrypto,
    private storage: ICookieStorage,
  ) {}

  execute(): string | null {
    const encodedUser = this.storage.get('user');

    if (!encodedUser) {
      return null;
    }

    try {
      const user = JSON.parse(this.crypto.decode(encodedUser));

      if (user?.type === 'PERSON') {
        return this.storage.get('companyId');
      }

      return user?.profile_id || null;
    } catch {
      return null;
    }
  }
}
