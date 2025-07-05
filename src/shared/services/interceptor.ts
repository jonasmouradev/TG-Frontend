import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { AxiosInstance } from 'axios';
import { decode } from '../utils';
import { Token } from '@/types/token';

export interface InterceptorDependencies {
  signOut: () => void;
  refreshToken: () => Promise<string | null>;
  companyId?: string;
  companyIdExceptions?: string[];
}

function isRefreshTokenRequest(url?: string): boolean {
  return !!url?.includes('refresh-token');
}

function isExceptionUrl(url: string | undefined, exceptions: string[] = []): boolean {
  return exceptions.includes(url || '');
}

function decodeAndCheckExpiration(token: string): {
  token: string;
  expired: boolean;
} {
  const decoded = decode(token);
  const decrypted = jwtDecode<Token>(decoded);
  const expiration = new Date(decrypted.exp * 1000).getTime();
  const now = Date.now();
  const expired = expiration - now <= 10;
  return { token: decoded, expired };
}

function attachHeaders(request: any, token?: string, companyId?: string, skipCompanyId?: boolean) {
  return {
    ...request,
    headers: {
      ...request.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(companyId && !skipCompanyId && { companyId }),
    },
  };
}

async function getValidToken(
  token: string | undefined,
  refreshToken: () => Promise<string | null>,
  signOut: () => void,
): Promise<string | undefined> {
  if (token) {
    try {
      const { token: decoded, expired } = decodeAndCheckExpiration(token);
      if (!expired) return decoded;
    } catch {
      signOut();
    }
  }
  return (await refreshToken()) || undefined;
}

export function createInterceptor(api: AxiosInstance, dependencies: InterceptorDependencies) {
  const { signOut, refreshToken, companyId, companyIdExceptions } = dependencies;

  const interceptRequest = () => {
    api.interceptors.request.use(async request => {
      const url = request?.url || '';
      if (isRefreshTokenRequest(url)) return request;

      const isException = isExceptionUrl(url, companyIdExceptions);
      const rawToken = Cookies.get('authToken');
      const validToken = await getValidToken(rawToken, refreshToken, signOut);

      return attachHeaders(request, validToken, companyId, isException);
    });
  };

  const interceptResponse = () => {
    api.interceptors.response.use(response => {
      const tokenExists = Boolean(Cookies.get('authToken'));
      const unauthorized = response?.status === 401;

      if (tokenExists && unauthorized) {
        signOut();
      }

      return response;
    });
  };

  return { interceptRequest, interceptResponse };
}
