import { IAuthManager } from '../../interfaces/AuthManager';
import { IResponse } from '../interfaces';

export class ResponseInterceptor {
  private authManager: IAuthManager;

  constructor(authManager: IAuthManager) {
    this.authManager = authManager;
  }

  handleResponse<T>(response: IResponse): T {
    const tokenFounded = Boolean(this.authManager.getAuthToken());
    const notAuthenticated = response?.status === 401;

    if (tokenFounded && notAuthenticated) {
      this.authManager.signOut();
    }

    return response as T;
  }
}
