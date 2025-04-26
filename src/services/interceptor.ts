import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {
  AxiosInstance,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from "axios";
import { decode } from "@/utils/crypto";

export interface InterceptorDependencies {
  logout: () => void;
  refreshToken: () => Promise<string | null>;
}

export function createInterceptor(
  api: AxiosInstance,
  dependencies: InterceptorDependencies,
) {
  const { logout, refreshToken } = dependencies;

  const intercept = () => {
    api.interceptors.request.use(async (config) => {
      const hasRefreshToken = config?.url?.includes("refresh-token");

      if (hasRefreshToken) return config;

      let token = Cookies.get("authToken");
      let isTokenExpiredOrAboutToExpire = false;

      if (token) {
        try {
          const decodedToken = decode(token);
          const decryptedToken = jwtDecode(decodedToken);
          const unixExpirationTimestamp = +new Date(
            decryptedToken.exp ?? 1 * 1000,
          );
          const unixCurrentTimestamp = +new Date();

          token = decodedToken;
          isTokenExpiredOrAboutToExpire =
            unixExpirationTimestamp - unixCurrentTimestamp <= 10;
        } catch {
          logout();
        }
      }

      if (!token || isTokenExpiredOrAboutToExpire) {
        token = (await refreshToken()) || undefined;
      }

      const settings: InternalAxiosRequestConfig = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: token ? `Bearer ${token}` : undefined,
        } as AxiosRequestHeaders,
      };

      return settings;
    });
  };

  const requestValidation = () => {
    api.interceptors.response.use(
      (res) => Promise.resolve(res),

      (err) => {
        const tokenFounded = Boolean(Cookies.get("authToken"));
        const notAuthenticated = err.response?.status === 401;
        if (tokenFounded && notAuthenticated) {
          logout();
          return;
        }
      },
    );
  };

  return { intercept, requestValidation };
}
