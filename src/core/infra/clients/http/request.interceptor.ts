import { IHttpClient, ICookieStorage, ICrypto, IRequest } from '@core/domain';
import { links } from '@shared/index';
import {
  GetAuthTokenUseCase,
  GetCompanyIdUseCase,
  SetAuthTokenUseCase,
  SignOutUseCase,
  ValidateTokenUseCase,
} from '@core/application';

interface TokenResponse {
  access_token: string;
  expires_in: string | number;
}

export class RequestInterceptor {
  private readonly getToken: GetAuthTokenUseCase;
  private readonly getCompanyId: GetCompanyIdUseCase;
  private readonly validateToken: ValidateTokenUseCase;
  private readonly signOut: SignOutUseCase;
  private readonly setToken: SetAuthTokenUseCase;

  constructor(crypto: ICrypto, storage: ICookieStorage) {
    this.signOut = new SignOutUseCase(storage);
    this.validateToken = new ValidateTokenUseCase();
    this.setToken = new SetAuthTokenUseCase(crypto, storage);
    this.getToken = new GetAuthTokenUseCase(crypto, storage);
    this.getCompanyId = new GetCompanyIdUseCase(crypto, storage);
  }

  async handleRequest<T>(request: IRequest, get: IHttpClient['get']): Promise<T> {
    const hasRefreshToken = request?.url?.includes('refresh-token');

    if (hasRefreshToken) return request as T;

    let token = this.getToken.execute();

    const companyId = this.getCompanyId.execute();

    let isTokenValid = true;

    if (token) {
      try {
        isTokenValid = this.validateToken.execute(token);
      } catch {
        this.signOut.execute();
        return request as T;
      }
    }

    if (!token || !isTokenValid) {
      try {
        const refreshedToken = await get<TokenResponse | null>({
          url: `${links.api}/refresh`,
        });
        if (refreshedToken?.data) {
          token = refreshedToken?.data.access_token;
          this.setToken.execute(refreshedToken?.data.access_token);
        }
      } catch {
        this.signOut.execute();
        return request as T;
      }
    }

    const updatedRequest = { ...request, headers: { ...request.headers } };

    if (token) {
      updatedRequest.headers.Authorization = `Bearer ${token}`;
    }

    if (companyId) {
      updatedRequest.headers.companyId = companyId;
    }

    return updatedRequest as T;
  }
}
