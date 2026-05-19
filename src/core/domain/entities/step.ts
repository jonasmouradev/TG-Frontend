import { DateTime } from 'luxon';

export const StepType = {
  APPLICATION: 'application',
  SCREENING: 'screening',
  INTERVIEW: 'interview',
  TECHNICAL_TEST: 'technical_test',
  BACKGROUND_CHECK: 'background_check',
  OFFER: 'offer',
  ONBOARDING: 'onboarding',
  CUSTOM: 'custom',
} as const;
export type StepType = (typeof StepType)[keyof typeof StepType];

type StepProps = {
  id: string;
  templateId: string | null;
  name: string;
  description?: string;
  type: StepType;
  estimatedDuration?: string;
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

  get templateId(): string | null {
    return this.props.templateId;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get type(): StepType {
    return this.props.type;
  }

  get estimatedDuration(): string | undefined {
    return this.props.estimatedDuration;
  }

  get createdAt(): DateTime {
    return this.props.createdAt;
  }

  get updatedAt(): DateTime {
    return this.props.updatedAt;
  }
}
