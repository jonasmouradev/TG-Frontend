import { IHttpClient, ICookieStorage, ICrypto, IRequest } from '@core/domain';
import { links } from '@/shared';
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
  private readonly getTokenUseCase: GetAuthTokenUseCase;
  private readonly getCompanyIdUseCase: GetCompanyIdUseCase;
  private readonly validateTokenUseCase: ValidateTokenUseCase;
  private readonly signOutUseCase: SignOutUseCase;
  private readonly setTokenUseCase: SetAuthTokenUseCase;

  constructor(crypto: ICrypto, storage: ICookieStorage) {
    this.signOutUseCase = new SignOutUseCase(storage);
    this.validateTokenUseCase = new ValidateTokenUseCase();
    this.setTokenUseCase = new SetAuthTokenUseCase(crypto, storage);
    this.getTokenUseCase = new GetAuthTokenUseCase(crypto, storage);
    this.getCompanyIdUseCase = new GetCompanyIdUseCase(crypto, storage);
  }

  async handleRequest<T>(request: IRequest, get: IHttpClient['get']): Promise<T> {
    const hasRefreshToken = request?.url?.includes('refresh-token');

    if (hasRefreshToken) return request as T;

    let token = this.getTokenUseCase.execute();

    const companyId = this.getCompanyIdUseCase.execute();

    let isTokenValid = true;

    if (token) {
      try {
        isTokenValid = this.validateTokenUseCase.execute(token);
      } catch {
        this.signOutUseCase.execute();
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
          this.setTokenUseCase.execute(refreshedToken?.data.access_token);
        }
      } catch {
        this.signOutUseCase.execute();
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
