import { links } from '@/utils/links';
import { IHttpClient } from '@/DI/interfaces/Clients/Http';
import { IAuthManager } from '../../interfaces/AuthManager';
import { IRequest, IResponse } from '../interfaces';
import { ITokenManager } from '../../interfaces/TokenManager';
import { COMPANY_ID_EXCEPTIONS } from '@/utils/constants';

interface TokenResponse {
  access_token: string;
  expires_in: string | number;
}

export class RequestInterceptor {
  private tokenManager: ITokenManager;
  private authManager: IAuthManager;

  constructor(authManager: IAuthManager, tokenManager: ITokenManager) {
    this.authManager = authManager;
    this.tokenManager = tokenManager;
  }

  async handleRequest<T>(request: IRequest, get: IHttpClient['get']): Promise<T> {
    const hasRefreshToken = request?.url?.includes('refresh-token');
    const isCompanyIdException = COMPANY_ID_EXCEPTIONS?.includes(request.url || '');

    if (hasRefreshToken) return request as T;

    let token = this.authManager.getAuthToken();

    const companyId = this.authManager.getCompanyId();
    let isTokenExpiredOrAboutToExpire = false;

    if (token) {
      try {
        isTokenExpiredOrAboutToExpire = this.tokenManager.isTokenExpiredOrAboutToExpire(token);
      } catch {
        this.authManager.signOut();
        return request as T;
      }
    }

    if (!token || isTokenExpiredOrAboutToExpire) {
      try {
        const refreshedToken = await get<IResponse<TokenResponse | null>>({
          url: `${links.api.schedule}/auth/refresh`,
        });
        if (refreshedToken?.data) {
          token = refreshedToken?.data.access_token;
          this.authManager.setAuthToken(refreshedToken?.data.access_token);
        }
      } catch {
        this.authManager.signOut();
        return request as T;
      }
    }

    const updatedRequest = { ...request, headers: { ...request.headers } };

    if (token) {
      updatedRequest.headers.Authorization = `Bearer ${token}`;
    }

    if (companyId && !isCompanyIdException) {
      updatedRequest.headers.companyId = companyId;
    }

    return updatedRequest as T;
  }
}
