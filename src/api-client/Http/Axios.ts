import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { Get, Put, Post, Delete, Patch, IHttpClient } from '@/DI/interfaces/Clients/Http';
import { IApiClientConfig, IResponse } from '@/DI/ApiClient/interfaces';
import { MINUTE_IN_MILLISECONDS } from '@/utils/constants';
import { RequestInterceptor, ResponseInterceptor } from '@/DI/ApiClient';
import { AxiosResponse } from 'axios';

export class AxiosClient implements IHttpClient {
  private instance: AxiosInstance;

  constructor(axiosInstance?: AxiosInstance, config?: IApiClientConfig) {
    this.instance =
      axiosInstance ||
      axios.create({
        baseURL: config?.baseURL || import.meta.env.VITE_API_URL || '/api',
        timeout: config?.timeout || 10 * MINUTE_IN_MILLISECONDS,
        headers: {
          'Content-Type': 'application/json',
          ...config?.headers,
        },
      });
  }

  public async get<R>({ url, params, headers }: Get): Promise<R | null> {
    try {
      const response = await this.instance.get<R>(url, { params, headers });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async post<R>({ url, payload, headers }: Post): Promise<R | null> {
    try {
      const response = await this.instance.post<R>(url, payload, { headers });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async patch<R>({ url, headers, payload }: Patch): Promise<R | null> {
    try {
      const response = await this.instance.patch<R>(url, payload, { headers });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async put<R>({ url, payload, headers }: Put): Promise<R | null> {
    try {
      const response = await this.instance.put<R>(url, payload, { headers });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async delete<R>({ url, params, headers }: Delete): Promise<R | null> {
    try {
      const response = await this.instance.delete<R>(url, { params, headers });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.instance.interceptors.request.use(
      request => interceptor.handleRequest<InternalAxiosRequestConfig>(request, this.get),
      error => Promise.reject(error),
    );
  }

  public addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.instance.interceptors.response.use(
      response => interceptor.handleResponse<AxiosResponse>(response as unknown as IResponse),
      error => Promise.reject(error),
    );
  }

  private handleError(error): null {
    if (error.response) {
      console.error(
        `AxiosTransporter: Response Error: ${error.message}, Data: ${JSON.stringify(
          error.response.data,
        )}, status -> ${error.response.status}`,
      );
    } else if (error.request) {
      console.error(`AxiosTransporter: Request Error: ${error.message}, Data: ${JSON.stringify(error.toJSON())}`);
    } else {
      console.error(`AxiosTransporter: Error: ${error.message}`);
    }
    return null;
  }
}
