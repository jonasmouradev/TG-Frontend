import { AxiosHttpClientAdapter, RequestInterceptor, ResponseInterceptor } from './clients/http';
import {
  AuthHttpGateway,
  UserHttpGateway,
  VacancyHttpGateway,
  ApplicationHttpGateway,
  CompanyHttpGateway,
  DashboardHttpGateway,
  ActivityHttpGateway,
  TemplateHttpGateway,
  CompetenceHttpGateway,
  StepHttpGateway,
} from '@core/application/gateways';

import {
  ApplicationGateway,
  AuthGateway,
  CompanyGateway,
  DashboardGateway,
  ICookieStorage,
  ICrypto,
  IHttpClient,
  UserGateway,
  VacancyGateway,
} from '@core/domain';
import { CookieStorage } from './cookie';
import { Crypto } from './crypto';
import { ActivityGateway } from '@core/domain/gateways/activity.gateway';
import { TemplateGateway } from '@core/domain/gateways/template.gateway';
import { CompetenceGateway } from '@core/domain/gateways/competence.gateway';
import { StepGateway } from '@core/domain/gateways/step.gateway';

/**
 * Simple Dependency Injection Container
 * Manages instances of gateways and use cases following Clean Architecture principles
 */
export class DIContainer {
  public readonly crypto: ICrypto;
  public readonly httpClient: IHttpClient;
  public readonly cookieStorage: ICookieStorage;

  public readonly authGateway: AuthGateway;
  public readonly userGateway: UserGateway;
  public readonly vacancyGateway: VacancyGateway;
  public readonly applicationGateway: ApplicationGateway;
  public readonly companyGateway: CompanyGateway;
  public readonly dashboardGateway: DashboardGateway;
  public readonly activityGateway: ActivityGateway;
  public readonly templateGateway: TemplateGateway;
  public readonly competenceGateway: CompetenceGateway;
  public readonly stepGateway: StepGateway;

  constructor() {
    this.crypto = new Crypto();
    this.cookieStorage = new CookieStorage();

    const requestInterceptor = new RequestInterceptor(this.crypto, this.cookieStorage);
    const responseInterceptor = new ResponseInterceptor(this.crypto, this.cookieStorage);
    this.httpClient = new AxiosHttpClientAdapter(requestInterceptor, responseInterceptor);

    // Gateway instances
    this.authGateway = new AuthHttpGateway(this.httpClient);
    this.userGateway = new UserHttpGateway(this.httpClient);
    this.stepGateway = new StepHttpGateway(this.httpClient);
    this.vacancyGateway = new VacancyHttpGateway(this.httpClient);
    this.companyGateway = new CompanyHttpGateway(this.httpClient);
    this.activityGateway = new ActivityHttpGateway(this.httpClient);
    this.templateGateway = new TemplateHttpGateway(this.httpClient);
    this.dashboardGateway = new DashboardHttpGateway(this.httpClient);
    this.competenceGateway = new CompetenceHttpGateway(this.httpClient);
    this.applicationGateway = new ApplicationHttpGateway(this.httpClient);
  }
}

// Global container instance
export const container = new DIContainer();

/**
 * React Context Provider for DI Container
 * Allows components to access use cases through React context
 */
export { container as diContainer };
