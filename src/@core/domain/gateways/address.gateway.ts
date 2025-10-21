import { PromiseResponse } from '@core/domain/ports/http-client.port';
import { Address, CreateAddressDto, UpdateAddressDto, AddressFilters } from '../entities';

export interface AddressListResponse {
  addresses: Address[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SetPrimaryAddressDto {
  isPrimary: boolean;
}

export abstract class AddressGateway {
  abstract getAddresses(filters?: AddressFilters): PromiseResponse<AddressListResponse>;
  abstract getAddressById(id: string): PromiseResponse<Address>;
  abstract createAddress(payload: CreateAddressDto): PromiseResponse<Address>;
  abstract updateAddress(id: string, payload: UpdateAddressDto): PromiseResponse<Address>;
  abstract deleteAddress(id: string): PromiseResponse<void>;
  abstract getAddressesByPerson(personId: string): PromiseResponse<Address[]>;
  abstract getAddressesByCompany(companyId: string): PromiseResponse<Address[]>;
  abstract setPrimaryAddress(id: string, payload: SetPrimaryAddressDto): PromiseResponse<Address>;
}
