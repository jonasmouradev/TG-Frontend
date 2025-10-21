import { DateTime } from 'luxon';

export const StepType = {
  APPLICATION: 'application',
  SCREENING: 'screening',
  INTERVIEW: 'interview',
  TECHNICAL_TEST: 'technical_test',
  BACKGROUND_CHECK: 'background_check',
  OFFER: 'offer',
  ONBOARDING: 'onboarding',
} as const;
export type StepType = (typeof StepType)[keyof typeof StepType];

type StepProps = {
  id: string;
  templateId: string;
  name: string;
  description?: string;
  order: number;
  type: StepType;
  isRequired: boolean;
  estimatedDuration?: number;
  config?: Record<string, any>;
  createdAt: DateTime;
  updatedAt: DateTime;
};

export class Step {
  private readonly props: StepProps;

  constructor(props: StepProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  get templateId(): string {
    return this.props.templateId;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get order(): number {
    return this.props.order;
  }

  get type(): StepType {
    return this.props.type;
  }

  get isRequired(): boolean {
    return this.props.isRequired;
  }

  get estimatedDuration(): number | undefined {
    return this.props.estimatedDuration;
  }

  get config(): Record<string, any> | undefined {
    return this.props.config;
  }

  get createdAt(): DateTime {
    return this.props.createdAt;
  }

  get updatedAt(): DateTime {
    return this.props.updatedAt;
  }
}
