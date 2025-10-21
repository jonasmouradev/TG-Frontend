import { PromiseResponse } from '@/core/domain/ports/http-client.port';
import { Phone, CreatePhoneDto, UpdatePhoneDto, PhoneFilters } from '../entities';

export interface PhoneListResponse {
  phones: Phone[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SetPrimaryPhoneDto {
  isPrimary: boolean;
}

export abstract class PhoneGateway {
  abstract getPhones(filters?: PhoneFilters): PromiseResponse<PhoneListResponse>;
  abstract getPhoneById(id: string): PromiseResponse<Phone>;
  abstract createPhone(payload: CreatePhoneDto): PromiseResponse<Phone>;
  abstract updatePhone(id: string, payload: UpdatePhoneDto): PromiseResponse<Phone>;
  abstract deletePhone(id: string): PromiseResponse<void>;
  abstract getPhonesByPerson(personId: string): PromiseResponse<Phone[]>;
  abstract setPrimaryPhone(id: string, payload: SetPrimaryPhoneDto): PromiseResponse<Phone>;
}
