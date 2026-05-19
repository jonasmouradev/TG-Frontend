import Cookies from 'js-cookie';

import { domainName } from '@shared/index';

import { ICookieStorage } from '@core/domain';

interface ICookieStorageOptions extends IRemoveOptions {
  expires?: number;
}

interface IRemoveOptions {
  domain?: string;
}

export class CookieStorage implements ICookieStorage {
  get(key: string): string | null {
    const cookieValue = Cookies.get(key);
    return cookieValue ?? null;
  }

  set(key: string, value: string, { domain, expires }: ICookieStorageOptions = {}): void {
    // For localhost development, don't set domain to avoid "invalid domain" errors
    const isLocalhost = globalThis.location.hostname === 'localhost' || globalThis.location.hostname === '127.0.0.1';

    const options: Cookies.CookieAttributes = {
      expires,
      sameSite: 'lax',
      secure: globalThis.location.protocol === 'https:',
    };

    // Only set domain if it's not localhost and a domain is provided
    if (!isLocalhost && domain) {
      options.domain = domain;
    }

    Cookies.set(key, value, options);
  }

  getAllData(): Record<string, string> {
    const allCookies = Cookies.get();
    return allCookies;
  }

  remove(key: string, { domain }: IRemoveOptions = {}): void {
    const isLocalhost = globalThis.location.hostname === 'localhost' || globalThis.location.hostname === '127.0.0.1';

    const options: Cookies.CookieAttributes = {};

    // Only set domain if it's not localhost and a domain is provided
    if (!isLocalhost && domain) {
      options.domain = domain;
    }

    Cookies.remove(key, options);
  }

  clear(): void {
    const isLocalhost = globalThis.location.hostname === 'localhost' || globalThis.location.hostname === '127.0.0.1';

    for (const cookie in this.getAllData()) {
      const options: Cookies.CookieAttributes = {};

      if (!isLocalhost) {
        options.domain = domainName;
      }

      Cookies.remove(cookie, options);
    }
  }
}
