import { VacancyGateway } from '@/core/domain/gateways/vacancy.gateway';
import { IUseCase } from '@/core/domain/use-case.interface';

export interface DeleteVacancyUseCaseInput {
  id: string;
}

export interface DeleteVacancyUseCaseOutput {
  success: boolean;
}

export class DeleteVacancyUseCase implements IUseCase<DeleteVacancyUseCaseInput, DeleteVacancyUseCaseOutput> {
  constructor(private vacancyGateway: VacancyGateway) {}

  async execute(input: DeleteVacancyUseCaseInput): Promise<DeleteVacancyUseCaseOutput> {
    const response = await this.vacancyGateway.remove(input.id);

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Failed to delete vacancy: ${response.statusText}`);
    }

    return {
      success: true,
    };
  }
}
