import { ICrypto, ICookieStorage } from '@core/domain/ports';
import { IUseCase } from '@core/domain/use-case.interface';
import { COOKIES } from '@shared/utils';

export class GetAuthTokenUseCase implements IUseCase<null, string | null> {
  constructor(
    private readonly crypto: ICrypto,
    private readonly storage: ICookieStorage,
  ) {}

  execute(): string | null {
    const encodedToken = this.storage.get(COOKIES.AUTH);

    if (!encodedToken) {
      return null;
    }

    try {
      return this.crypto.decode(encodedToken);
    } catch {
      return null;
    }
  }
}
