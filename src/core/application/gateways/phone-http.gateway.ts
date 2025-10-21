import {
  PhoneGateway,
  PhoneListResponse,
  SetPrimaryPhoneDto,
  PhoneFilters,
  CreatePhoneDto,
  UpdatePhoneDto,
  Phone,
} from '@/core/domain';
import { IHttpClient, PromiseResponse } from '@/core/domain/ports/http-client.port';

export class PhoneHttpGateway implements PhoneGateway {
  constructor(private readonly httpClient: IHttpClient) {}

  async getPhones(filters?: PhoneFilters): PromiseResponse<PhoneListResponse> {
    return this.httpClient.get<PhoneListResponse>({
      url: `/phones`,
      params: filters as Record<string, unknown>,
    });
  }

  async getPhoneById(id: string): PromiseResponse<Phone> {
    return this.httpClient.get<Phone>({ url: `/phones/${id}` });
  }

  async createPhone(payload: CreatePhoneDto): PromiseResponse<Phone> {
    return this.httpClient.post<Phone>({ url: `/phones`, payload });
  }

  async updatePhone(id: string, payload: UpdatePhoneDto): PromiseResponse<Phone> {
    return this.httpClient.put<Phone>({ url: `/phones/${id}`, payload });
  }

  async deletePhone(id: string): PromiseResponse<void> {
    return this.httpClient.delete({ url: `/phones/${id}` });
  }

  async getPhonesByPerson(personId: string): PromiseResponse<Phone[]> {
    return this.httpClient.get<Phone[]>({ url: `/phones/person/${personId}` });
  }

  async setPrimaryPhone(id: string, payload: SetPrimaryPhoneDto): PromiseResponse<Phone> {
    return this.httpClient.patch<Phone>({ url: `/phones/${id}/set-primary`, payload });
  }
}
