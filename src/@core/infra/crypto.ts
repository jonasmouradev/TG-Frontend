import pkg, { lib } from 'crypto-js';

import { links } from '@/shared';

import { ICrypto } from '@core/domain';

const { AES, enc } = pkg;
const SECRET: string = links.secret;

export class Crypto implements ICrypto {
  public encode(message: string): string {
    return AES.encrypt(message, SECRET).toString();
  }

  public decode(message: lib.CipherParams | string): string {
    const bytes = AES.decrypt(message, SECRET);

    return bytes.toString(enc.Utf8);
  }
}
