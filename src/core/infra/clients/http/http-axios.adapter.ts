import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import {
  Get,
  Post,
  Put,
  Patch,
  Delete,
  IResponse,
  IHttpClient,
  HttpStatusCode,
  IApiClientConfig,
} from '@core/domain/ports/http-client.port';
import { MINUTE_IN_MILLISECONDS } from '@shared/utils/constants';
import { RequestInterceptor } from './request.interceptor';
import { ResponseInterceptor } from './response.interceptor';

interface ErrorWithResponse {
  response?: {
    data: unknown;
    status: number;
  };
  request?: unknown;
  message?: string;
  toJSON?: () => unknown;
}

export class AxiosHttpClientAdapter implements IHttpClient {
  private instance: AxiosInstance;

  constructor(
    requestInterceptor: RequestInterceptor,
    responseInterceptor: ResponseInterceptor,
    axiosInstance?: AxiosInstance,
    config?: IApiClientConfig,
  ) {
    this.instance =
      axiosInstance ||
      axios.create({
        baseURL: config?.baseURL || import.meta.env.VITE_API_URL || '/api',
        timeout: config?.timeout || 2 * MINUTE_IN_MILLISECONDS,
        headers: {
          'Content-Type': 'application/json',
          ...config?.headers,
        },
      });
    this.addRequestInterceptor(requestInterceptor);
    this.addResponseInterceptor(responseInterceptor);
  }

  public async get<R>({ url, params, headers }: Get): Promise<IResponse<R | null>> {
    try {
      const response = await this.instance.get<R>(url, { params, headers });
      return this.toOutput<R>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async post<R>({ url, payload, headers }: Post): Promise<IResponse<R | null>> {
    try {
      const response = await this.instance.post<R>(url, payload, { headers });
      return this.toOutput<R>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async patch<R>({ url, headers, payload }: Patch): Promise<IResponse<R | null>> {
    try {
      const response = await this.instance.patch<R>(url, payload, { headers });
      return this.toOutput<R>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async put<R>({ url, payload, headers }: Put): Promise<IResponse<R | null>> {
    try {
      const response = await this.instance.put<R>(url, payload, { headers });
      return this.toOutput<R>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async delete<R>({ url, params, headers }: Delete): Promise<IResponse<R | null>> {
    try {
      const response = await this.instance.delete<R>(url, { params, headers });
      return this.toOutput<R>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.instance.interceptors.request.use(
      request => interceptor.handleRequest<InternalAxiosRequestConfig>(request, this.get),
      error => Promise.reject(error),
    );
  }

  private addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.instance.interceptors.response.use(
      response => interceptor.handleResponse<AxiosResponse>(response as unknown as IResponse),
      error => Promise.reject(error),
    );
  }

  private handleError(error: unknown): IResponse<null> {
    const err = error as ErrorWithResponse;
    if (err.response) {
      console.error(
        `AxiosHttpClientAdapter: Response Error: ${err.message}, Data: ${JSON.stringify(
          err.response.data,
        )}, status -> ${err.response.status}`,
      );
    } else if (err.request) {
      console.error(`AxiosHttpClientAdapter: Request Error: ${err.message}, Data: ${JSON.stringify(err.toJSON?.())}`);
    } else {
      console.error(`AxiosHttpClientAdapter: Error: ${err.message}`);
    }
    return {
      data: null,
      status: (err.response?.status as HttpStatusCode) || HttpStatusCode.serverError,
      statusText: err.message || 'Internal Server Error',
      headers: {},
    };
  }

  private toOutput<T>(response: AxiosResponse<T>): IResponse<T | null> {
    return {
      data: response.data || null,
      status: response.status as HttpStatusCode,
      statusText: response.statusText,
      headers: response.headers as Record<string, string>,
    };
  }
}
