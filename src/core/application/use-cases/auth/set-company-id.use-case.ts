import { ICookieStorage } from '@core/domain/ports';
import { IUseCase } from '@core/domain/use-case.interface';
import { COOKIES } from '@shared/utils';

export class SetCompanyIdUseCase implements IUseCase<string, void> {
  constructor(private readonly storage: ICookieStorage) {}

  execute(companyId: string): void {
    this.storage.set(COOKIES.COMPANY_ID, companyId, { expires: 7 });
  }
}
