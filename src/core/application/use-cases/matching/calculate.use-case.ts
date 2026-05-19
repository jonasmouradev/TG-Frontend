import { MatchingGateway } from '@core/domain/gateways/matching.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export type CalculateInput = {
  personId: string;
  vacancyId: string;
};

export type CalculateOutput = number | null;

export class CalculateUseCase implements IUseCase<CalculateInput, CalculateOutput> {
  constructor(private readonly gateway: MatchingGateway) {}

  async execute(input: CalculateInput): Promise<CalculateOutput> {
    const response = await this.gateway.calculate({
      personId: input.personId,
      vacancyId: input.vacancyId,
    });

    return response.data;
  }
}
