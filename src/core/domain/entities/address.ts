export type Address = {
  id: string;
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isPrimary: boolean;
  personId?: string;
  companyId?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateAddressDto = {
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isPrimary?: boolean;
  personId?: string;
  companyId?: string;
};

export type UpdateAddressDto = {
  street?: string;
  number?: string;
  complement?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  isPrimary?: boolean;
};

export type AddressFilters = {
  personId?: string;
  companyId?: string;
  city?: string;
  state?: string;
  country?: string;
  isPrimary?: boolean;
  page?: number;
  limit?: number;
};
