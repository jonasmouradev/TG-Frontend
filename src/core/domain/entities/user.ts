import { Address } from './address';
import { Phone } from './phone';

export type UserType = 'COMPANY' | 'PERSON';

export type UserConfig = {
  auth2f: boolean;
  default_interface: 'LIGHT' | 'DARK';
  default_language: string;
  default_timezone: string;
  layout_name: string;
  master: boolean;
};

export type UserProps = {
  profile_id: string;
  email: string;
  id: string;
  type: UserType;
  username: string;
  name: string;
  config: UserConfig;
  phone?: Phone;
  address?: Address;
};

export class User {
  private readonly props: UserProps;

  constructor(props: UserProps) {
    this.props = props;
  }

  get profileId(): string {
    return this.props.profile_id;
  }

  get email(): string {
    return this.props.email;
  }

  get id(): string {
    return this.props.id;
  }

  get type(): UserType {
    return this.props.type;
  }

  get username(): string {
    return this.props.username;
  }

  get name(): string {
    return this.props.name;
  }

  get config() {
    return this.props.config;
  }

  get phone(): Phone | undefined {
    return this.props.phone;
  }

  get address(): Address | undefined {
    return this.props.address;
  }
}
