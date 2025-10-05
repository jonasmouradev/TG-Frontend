import { ICrypto, ICookieStorage } from '@core/domain/ports';
import { domainName } from '@/shared';
import { User, UserProps } from '@core/domain';
import { IUseCase } from '@core/domain/use-case.interface';

export class UpdateUserUseCase implements IUseCase<User, void> {
  constructor(
    private crypto: ICrypto,
    private storage: ICookieStorage,
  ) {}

  execute(user: User): void {
    const userCookie: UserProps = {
      id: user.id,
      config: user.config,
      email: user.email,
      profile_id: user.profileId,
      type: user.type,
      username: user.username,
    };
    const encodedUser = this.crypto.encode(JSON.stringify(userCookie));
    this.storage.set('user', encodedUser, { expires: 7, domain: domainName });
  }
}
