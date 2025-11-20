import { ICrypto, ICookieStorage } from '@core/domain/ports';
import { COOKIES, domainName } from '@shared/index';
import { User, UserProps } from '@core/domain';
import { IUseCase } from '@core/domain/use-case.interface';

export class UpdateUserSessionUseCase implements IUseCase<User, void> {
  constructor(
    private readonly crypto: ICrypto,
    private readonly storage: ICookieStorage,
  ) {}

  execute(user: User): void {
    const userCookie: UserProps = {
      id: user.id,
      config: user.config,
      email: user.email,
      profile_id: user.profileId,
      type: user.type,
      username: user.username,
      name: user.name,
    };
    const encodedUser = this.crypto.encode(JSON.stringify(userCookie));
    this.storage.set(COOKIES.USER, encodedUser, { expires: 7, domain: domainName });
  }
}
