import { IAuthManager } from '../../interfaces/AuthManager';
import { ITokenManager } from '../../interfaces/TokenManager';
import { RequestInterceptor } from '../Interceptors/Request';
import { ResponseInterceptor } from '../Interceptors/Response';
import { IHttpClient } from '@/DI/interfaces/Clients/Http';

interface ICreateApiClientParams {
  tokenManager: ITokenManager;
  authManager: IAuthManager;
  httpClient: IHttpClient;
}

export class ApiClientFactory {
  private static instance: IHttpClient;

  static create(httpClient: IHttpClient, tokenManager: ITokenManager, authManager: IAuthManager): IHttpClient {
    if (this.instance) {
      return this.instance;
    }

    const manager = tokenManager;
    const auth = authManager;

    this.instance = httpClient;

    const requestInterceptor = new RequestInterceptor(auth, manager);
    const responseInterceptor = new ResponseInterceptor(auth);

    this.instance.addRequestInterceptor(requestInterceptor);
    this.instance.addResponseInterceptor(responseInterceptor);

    return this.instance;
  }

  static getInstance({ authManager, httpClient, tokenManager }: ICreateApiClientParams): IHttpClient {
    if (!this.instance) {
      this.create(httpClient, tokenManager, authManager);
    }
    return this.instance;
  }

  static reset(): void {
    this.instance = null as unknown as IHttpClient;
  }
}
