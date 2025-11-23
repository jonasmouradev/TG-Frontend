import { ICookieStorage, ICrypto, IResponse } from '@core/domain';
import { GetAuthTokenUseCase, SignOutUseCase } from '@core/application/use-cases';

export class ResponseInterceptor {
  private readonly getToken: GetAuthTokenUseCase;
  private readonly signout: SignOutUseCase;

  constructor(crypto: ICrypto, storage: ICookieStorage) {
    this.getToken = new GetAuthTokenUseCase(crypto, storage);
    this.signout = new SignOutUseCase(storage);
  }

  handleResponse<T>(response: IResponse): T {
    const tokenFounded = Boolean(this.getToken.execute());
    const notAuthenticated = response?.status === 401;

    if (tokenFounded && notAuthenticated) {
      this.signout.execute();
    }

    return response as T;
  }
}
