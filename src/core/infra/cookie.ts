import Cookies from 'js-cookie';

import { domainName } from '@/shared';

import { ICookieStorage } from '@/core/domain';

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

  set(key: string, value: string, { domain: domainName }: ICookieStorageOptions = {}): void {
    Cookies.set(key, value, { domain: domainName });
  }

  getAllData(): Record<string, string> {
    const allCookies = Cookies.get();
    return allCookies;
  }

  remove(key: string, { domain: domainName }: IRemoveOptions = {}): void {
    Cookies.remove(key, { domain: domainName });
  }

  clear(): void {
    for (const cookie in this.getAllData()) {
      Cookies.remove(cookie, { domain: domainName });
    }
  }
}
