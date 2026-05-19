import { jwtDecode } from 'jwt-decode';

export class DecodeTokenUseCase {
  execute<T>(token: string): T | null {
    if (!token) return null;

    try {
      return jwtDecode<T>(token);
    } catch {
      return null;
    }
  }
}
