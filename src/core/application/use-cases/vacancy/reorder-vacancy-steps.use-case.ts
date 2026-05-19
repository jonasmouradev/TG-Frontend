import { VacancyGateway } from '@core/domain/gateways/vacancy.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export interface ReorderVacancyStepsInput {
  vacancyId: string;
  stepIds: string[];
}

export type ReorderVacancyStepsOutput = void;

export class ReorderVacancyStepsUseCase implements IUseCase<ReorderVacancyStepsInput, ReorderVacancyStepsOutput> {
  constructor(private readonly gateway: VacancyGateway) {}

  async execute(input: ReorderVacancyStepsInput): Promise<ReorderVacancyStepsOutput> {
    await this.gateway.reorderSteps(input);
  }
}
