import { User, ICrypto, ICookieStorage } from '@/core/domain';
import { IUseCase } from '@/core/domain/use-case.interface';

export class GetCurrentUserUseCase implements IUseCase<null, User | null> {
  constructor(
    private crypto: ICrypto,
    private storage: ICookieStorage,
  ) {}

  execute(): User | null {
    const encodedUser = this.storage.get('user');

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
