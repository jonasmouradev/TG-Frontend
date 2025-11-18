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
  // Auth use cases
  AuthenticateUserUseCase,
  SignUpUseCase,
  ResetPasswordUseCase,
  RefreshTokenUseCase,
  ForgotPasswordUseCase,

  // User use cases
  GetCurrentUserUseCase,
  GetUserUseCase,
  UpdateUserUseCase,
  UpdateUserEmailUseCase,

  // Vacancy use cases
  GetVacancyUseCase,
  UpdateVacancyUseCase,
  DeleteVacancyUseCase,
  PublishVacancyUseCase,
  CreateVacancyUseCase,

  // Application use cases
  GetApplicationsUseCase,
  CreateApplicationUseCase,
  UpdateApplicationStatusUseCase,

  // Company use cases
  GetCompanyUseCase,
  CreateCompanyUseCase,
  GetCompanyStatisticsUseCase,

  // Dashboard use cases
  GetDashboardStatsUseCase,
  GetCompanyStatsUseCase,
  GetRecentApplicationsUseCase,

  // Activity use cases
  GetRecentActivitiesUseCase,
  GetRecruitmentProcessesUseCase,

  // Template use cases
  GetProcessTemplatesUseCase,
  CreateProcessTemplateUseCase,
  GetDefaultTemplatesUseCase,

  // Competence use cases
  GetCompetencesUseCase,
  GetCompetenceByIdUseCase,
  CreateCompetenceUseCase,
  UpdateCompetenceUseCase,
  DeleteCompetenceUseCase,

  // Step use cases
  GetStepsUseCase,
  CreateStepUseCase,
  UpdateStepUseCase,
  DeleteStepUseCase,
  ReorderStepsUseCase,
  SetAuthTokenUseCase,
} from '@core/application/use-cases';
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

  // Auth use case factories
  createAuthenticateUserUseCase(): AuthenticateUserUseCase {
    return new AuthenticateUserUseCase(this.authGateway);
  }

  createSignUpUseCase(): SignUpUseCase {
    return new SignUpUseCase(this.authGateway);
  }

  createResetPasswordUseCase(): ResetPasswordUseCase {
    return new ResetPasswordUseCase(this.authGateway);
  }

  createRefreshTokenUseCase(): RefreshTokenUseCase {
    return new RefreshTokenUseCase(this.authGateway);
  }

  createForgotPasswordUseCase(): ForgotPasswordUseCase {
    return new ForgotPasswordUseCase(this.authGateway);
  }

  createSetAuthTokenUseCase(): SetAuthTokenUseCase {
    return new SetAuthTokenUseCase(this.crypto, this.cookieStorage);
  }

  // User use case factories
  createGetCurrentUserUseCase(): GetCurrentUserUseCase {
    return new GetCurrentUserUseCase(this.userGateway);
  }

  createGetUserUseCase(): GetUserUseCase {
    return new GetUserUseCase(this.userGateway);
  }

  createUpdateUserUseCase(): UpdateUserUseCase {
    return new UpdateUserUseCase(this.userGateway);
  }

  createUpdateUserEmailUseCase(): UpdateUserEmailUseCase {
    return new UpdateUserEmailUseCase(this.userGateway);
  }

  // Vacancy use case factories
  createGetVacancyUseCase(): GetVacancyUseCase {
    return new GetVacancyUseCase(this.vacancyGateway);
  }

  createUpdateVacancyUseCase(): UpdateVacancyUseCase {
    return new UpdateVacancyUseCase(this.vacancyGateway);
  }

  createDeleteVacancyUseCase(): DeleteVacancyUseCase {
    return new DeleteVacancyUseCase(this.vacancyGateway);
  }

  createPublishVacancyUseCase(): PublishVacancyUseCase {
    return new PublishVacancyUseCase(this.vacancyGateway);
  }

  createCreateVacancyUseCase(): CreateVacancyUseCase {
    return new CreateVacancyUseCase(this.vacancyGateway);
  }

  // Application use case factories
  createGetApplicationsUseCase(): GetApplicationsUseCase {
    return new GetApplicationsUseCase(this.applicationGateway);
  }

  createCreateApplicationUseCase(): CreateApplicationUseCase {
    return new CreateApplicationUseCase(this.applicationGateway);
  }

  createUpdateApplicationStatusUseCase(): UpdateApplicationStatusUseCase {
    return new UpdateApplicationStatusUseCase(this.applicationGateway);
  }

  // Company use case factories
  createGetCompanyUseCase(): GetCompanyUseCase {
    return new GetCompanyUseCase(this.companyGateway);
  }

  createCreateCompanyUseCase(): CreateCompanyUseCase {
    return new CreateCompanyUseCase(this.companyGateway);
  }

  createGetCompanyStatisticsUseCase(): GetCompanyStatisticsUseCase {
    return new GetCompanyStatisticsUseCase(this.companyGateway);
  }

  // Dashboard use case factories
  createGetDashboardStatsUseCase(): GetDashboardStatsUseCase {
    return new GetDashboardStatsUseCase(this.dashboardGateway);
  }

  createGetCompanyStatsUseCase(): GetCompanyStatsUseCase {
    return new GetCompanyStatsUseCase(this.dashboardGateway);
  }

  createGetRecentApplicationsUseCase(): GetRecentApplicationsUseCase {
    return new GetRecentApplicationsUseCase(this.dashboardGateway);
  }

  // Activity use case factories
  createGetRecentActivitiesUseCase(): GetRecentActivitiesUseCase {
    return new GetRecentActivitiesUseCase(this.activityGateway);
  }

  createGetRecruitmentProcessesUseCase(): GetRecruitmentProcessesUseCase {
    return new GetRecruitmentProcessesUseCase(this.activityGateway);
  }

  // Template use case factories
  createGetProcessTemplatesUseCase(): GetProcessTemplatesUseCase {
    return new GetProcessTemplatesUseCase(this.templateGateway);
  }

  createCreateProcessTemplateUseCase(): CreateProcessTemplateUseCase {
    return new CreateProcessTemplateUseCase(this.templateGateway);
  }

  createGetDefaultTemplatesUseCase(): GetDefaultTemplatesUseCase {
    return new GetDefaultTemplatesUseCase(this.templateGateway);
  }

  // Competence use case factories
  createGetCompetencesUseCase(): GetCompetencesUseCase {
    return new GetCompetencesUseCase(this.competenceGateway);
  }

  createGetCompetenceByIdUseCase(): GetCompetenceByIdUseCase {
    return new GetCompetenceByIdUseCase(this.competenceGateway);
  }

  createCreateCompetenceUseCase(): CreateCompetenceUseCase {
    return new CreateCompetenceUseCase(this.competenceGateway);
  }

  createUpdateCompetenceUseCase(): UpdateCompetenceUseCase {
    return new UpdateCompetenceUseCase(this.competenceGateway);
  }

  createDeleteCompetenceUseCase(): DeleteCompetenceUseCase {
    return new DeleteCompetenceUseCase(this.competenceGateway);
  }

  // Step use case factories
  createGetStepsUseCase(): GetStepsUseCase {
    return new GetStepsUseCase(this.stepGateway);
  }

  createCreateStepUseCase(): CreateStepUseCase {
    return new CreateStepUseCase(this.stepGateway);
  }

  createUpdateStepUseCase(): UpdateStepUseCase {
    return new UpdateStepUseCase(this.stepGateway);
  }

  createDeleteStepUseCase(): DeleteStepUseCase {
    return new DeleteStepUseCase(this.stepGateway);
  }

  createReorderStepsUseCase(): ReorderStepsUseCase {
    return new ReorderStepsUseCase(this.stepGateway);
  }
}

// Global container instance
export const container = new DIContainer();

/**
 * React Context Provider for DI Container
 * Allows components to access use cases through React context
 */
export { container as diContainer };
