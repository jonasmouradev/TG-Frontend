import { MatchingGateway } from '@core/domain/gateways/matching.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export type RecalculateInput = {
  matchId: string;
};

export type RecalculateOutput = number | null;

export class RecalculateUseCase implements IUseCase<RecalculateInput, RecalculateOutput> {
  constructor(private readonly gateway: MatchingGateway) {}

  async execute(input: RecalculateInput): Promise<RecalculateOutput> {
    const response = await this.gateway.recalculate({
      matchId: input.matchId,
    });

    return response.data;
  }
}
