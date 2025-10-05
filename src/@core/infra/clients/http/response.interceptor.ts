import { ICookieStorage, ICrypto, IResponse } from '@core/domain';
import { GetAuthTokenUseCase, SignOutUseCase } from '@core/application';

export class ResponseInterceptor {
  private readonly getTokenUseCase: GetAuthTokenUseCase;
  private readonly signoutUseCase: SignOutUseCase;

  constructor(crypto: ICrypto, storage: ICookieStorage) {
    this.getTokenUseCase = new GetAuthTokenUseCase(crypto, storage);
    this.signoutUseCase = new SignOutUseCase(storage);
  }

  handleResponse<T>(response: IResponse): T {
    const tokenFounded = Boolean(this.getTokenUseCase.execute());
    const notAuthenticated = response?.status === 401;

    if (tokenFounded && notAuthenticated) {
      this.signoutUseCase.execute();
    }

    return response as T;
  }
}
