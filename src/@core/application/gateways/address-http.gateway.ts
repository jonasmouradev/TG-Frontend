import { Address, AddressFilters, CreateAddressDto, UpdateAddressDto } from '@core/domain';
import { AddressGateway, AddressListResponse, SetPrimaryAddressDto } from '@core/domain/gateways/address.gateway';
import { IHttpClient, PromiseResponse } from '@core/domain/ports/http-client.port';

export class AddressHttpGateway implements AddressGateway {
  constructor(private readonly httpClient: IHttpClient) {}

  async getAddresses(filters?: AddressFilters): PromiseResponse<AddressListResponse> {
    return this.httpClient.get<AddressListResponse>({
      url: `/addresses`,
      params: filters as Record<string, unknown>,
    });
  }

  async getAddressById(id: string): PromiseResponse<Address> {
    return this.httpClient.get<Address>({ url: `/addresses/${id}` });
  }

  async createAddress(payload: CreateAddressDto): PromiseResponse<Address> {
    return this.httpClient.post<Address>({ url: `/addresses`, payload });
  }

  async updateAddress(id: string, payload: UpdateAddressDto): PromiseResponse<Address> {
    return this.httpClient.put<Address>({ url: `/addresses/${id}`, payload });
  }

  async deleteAddress(id: string): PromiseResponse<void> {
    return this.httpClient.delete({ url: `/addresses/${id}` });
  }

  async getAddressesByPerson(personId: string): PromiseResponse<Address[]> {
    return this.httpClient.get<Address[]>({ url: `/addresses/person/${personId}` });
  }

  async getAddressesByCompany(companyId: string): PromiseResponse<Address[]> {
    return this.httpClient.get<Address[]>({ url: `/addresses/company/${companyId}` });
  }

  async setPrimaryAddress(id: string, payload: SetPrimaryAddressDto): PromiseResponse<Address> {
    return this.httpClient.patch<Address>({ url: `/addresses/${id}/set-primary`, payload });
  }
}
