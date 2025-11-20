import { jwtDecode } from 'jwt-decode';
import { IToken } from '@shared/index';

export class ValidateTokenUseCase {
  execute(token: string): boolean {
    if (!token) {
      return false;
    }

    try {
      const decryptedToken = jwtDecode<IToken>(token);
      const unixExpirationTimestamp = +new Date(decryptedToken.exp * 1000);
      const unixCurrentTimestamp = +Date.now();
      console.log({
        unixExpirationTimestamp,
        unixCurrentTimestamp,
        diff: unixExpirationTimestamp - unixCurrentTimestamp,
      });
      console.log('decryptedToken', decryptedToken);

      return unixExpirationTimestamp - unixCurrentTimestamp > 10;
    } catch {
      return false;
    }
  }
}
