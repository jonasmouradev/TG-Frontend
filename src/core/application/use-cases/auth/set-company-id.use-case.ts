import { ICookieStorage } from '@core/domain/ports';
import { IUseCase } from '@core/domain/use-case.interface';

export class SetCompanyIdUseCase implements IUseCase<string, void> {
  constructor(private storage: ICookieStorage) {}

  execute(companyId: string): void {
    this.storage.set('companyId', companyId, { expires: 7 });
  }
}
