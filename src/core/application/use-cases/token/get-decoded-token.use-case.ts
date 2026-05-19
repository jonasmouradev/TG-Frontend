import { ICookieStorage, ICrypto, IUseCase } from '@core/domain';
import { IToken } from '@shared/types';
import { COOKIES } from '@shared/utils';
import { jwtDecode } from 'jwt-decode';

export class GetDecodedTokenUseCase implements IUseCase<string, IToken | null> {
  constructor(
    private readonly crypto: ICrypto,
    private readonly storage: ICookieStorage,
  ) {}

  execute(): IToken | null {
    const encodedToken = this.storage.get(COOKIES.AUTH);

    if (!encodedToken) {
      return null;
    }

    try {
      const token = this.crypto.decode(encodedToken);
      return token ? jwtDecode<IToken>(token) : null;
    } catch {
      return null;
    }
  }
}
