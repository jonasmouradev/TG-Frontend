import { jwtDecode } from 'jwt-decode';
import { IToken } from '@/shared';

export class ValidateTokenUseCase {
  execute(token: string): boolean {
    if (!token) {
      return false;
    }

    try {
      const decryptedToken = jwtDecode<IToken>(token);
      const unixExpirationTimestamp = +new Date(decryptedToken.exp * 1000);
      const unixCurrentTimestamp = +Date.now();

      return unixExpirationTimestamp - unixCurrentTimestamp > 10;
    } catch {
      return false;
    }
  }
}
