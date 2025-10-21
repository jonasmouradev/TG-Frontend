export type PhoneType = 'mobile' | 'landline' | 'work' | 'fax';

export type Phone = {
  id: string;
  number: string;
  countryCode?: string;
  areaCode?: string;
  type: PhoneType;
  isPrimary: boolean;
  isVerified: boolean;
  personId: string;
  createdAt: string;
  updatedAt: string;
};

export type CreatePhoneDto = {
  number: string;
  countryCode?: string;
  areaCode?: string;
  type: PhoneType;
  isPrimary?: boolean;
  personId: string;
};

export type UpdatePhoneDto = {
  number?: string;
  countryCode?: string;
  areaCode?: string;
  type?: PhoneType;
  isPrimary?: boolean;
};

export type PhoneFilters = {
  personId?: string;
  type?: PhoneType;
  isPrimary?: boolean;
  page?: number;
  limit?: number;
};
