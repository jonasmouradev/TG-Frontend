import { QueryOptions } from '@tanstack/react-query';

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type Status = 'active' | 'inactive' | 'pending' | 'suspended';

export interface SelectOption {
  label: string;
  value: string;
}

export interface IToken extends IUser {
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  nbf: number;
  prv: string;
  sub: string;
}

export interface IUser {
  config: {
    auth2f: boolean;
    default_interface: 'LIGHT' | 'DARK';
    default_language: string;
    default_timezone: string;
    master: boolean;
  };
  profileId: string;
  id: string;
  type: 'COMPANY' | 'PERSON';
  username: string;
  companyId: string | null;
  profile:
    | {
        id: string;
        cnpj: string;
      }
    | {
        id: string;
        cpf: string;
      };
}

export type QueryHookOptions<I, O> = {
  input: I;
  enabled?: boolean;
  staleTime?: number;
} & QueryOptions<O>;
