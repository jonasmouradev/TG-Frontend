export interface ICrypto {
  encode(message: string): string;
  decode(message: string): string;
}
