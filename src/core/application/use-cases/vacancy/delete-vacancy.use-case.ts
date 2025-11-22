import { VacancyGateway } from '@core/domain/gateways/vacancy.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export interface DeleteVacancyInput {
  id: string;
}

export interface DeleteVacancyOutput {
  success: boolean;
}

export class DeleteVacancyUseCase implements IUseCase<DeleteVacancyInput, DeleteVacancyOutput> {
  constructor(private readonly gateway: VacancyGateway) {}

  async execute(input: DeleteVacancyInput): Promise<DeleteVacancyOutput> {
    const response = await this.gateway.remove(input.id);

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Failed to delete vacancy: ${response.statusText}`);
    }

    return {
      success: true,
    };
  }
}
