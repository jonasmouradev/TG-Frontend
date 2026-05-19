import { User, ICrypto, ICookieStorage } from '@core/domain';
import { IUseCase } from '@core/domain/use-case.interface';
import { COOKIES } from '@shared/utils';

export class GetCurrentUserUseCase implements IUseCase<null, User | null> {
  constructor(
    private readonly crypto: ICrypto,
    private readonly storage: ICookieStorage,
  ) {}

  execute(): User | null {
    const encodedUser = this.storage.get(COOKIES.USER);

    if (!encodedUser) {
      return null;
    }

    try {
      const decryptedUser = this.crypto.decode(encodedUser);
      return new User(JSON.parse(decryptedUser));
    } catch {
      return null;
    }
  }
}
