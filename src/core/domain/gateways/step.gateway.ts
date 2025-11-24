import { PaginatedList, Step, StepType } from '@core/domain/entities';
import { PromiseResponse } from '../ports/http-client.port';

type Filters = {
  templateId?: string;
  name?: string;
  type?: StepType;
  isRequired?: boolean;
};

type Create = {
  templateId?: string;
  name: string;
  description?: string;
  order: number;
  type: StepType;
  isRequired: boolean;
  estimatedDuration?: number;
  config?: Record<string, any>;
};

type Update = {
  name?: string;
  description?: string;
  order?: number;
  type?: StepType;
  isRequired?: boolean;
  estimatedDuration?: number;
  config?: Record<string, any>;
};

type StepList = PaginatedList<Step>;

export interface StepGateway {
  findOne(id: string): PromiseResponse<Step | null>;
  findAll(params?: Filters): PromiseResponse<StepList>;
  create(payload: Create): PromiseResponse<Step | null>;
  update(id: string, payload: Update): PromiseResponse<Step | null>;
  remove(id: string): PromiseResponse<void | null>;
  reorderSteps(templateId: string, stepIds: string[]): PromiseResponse<StepList>;
}

export type { Filters as StepFilters, Update as UpdateStepDto, Create as CreateStepDto, StepList };
