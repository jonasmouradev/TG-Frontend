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
  SignInUseCase,
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
  authenticateUserUseCase(): AuthenticateUserUseCase {
    return new AuthenticateUserUseCase(this.authGateway);
  }

  signInUseCase(): SignInUseCase {
    return new SignInUseCase(this.crypto, this.cookieStorage);
  }

  signUpUseCase(): SignUpUseCase {
    return new SignUpUseCase(this.authGateway);
  }

  resetPasswordUseCase(): ResetPasswordUseCase {
    return new ResetPasswordUseCase(this.authGateway);
  }

  refreshTokenUseCase(): RefreshTokenUseCase {
    return new RefreshTokenUseCase(this.authGateway);
  }

  forgotPasswordUseCase(): ForgotPasswordUseCase {
    return new ForgotPasswordUseCase(this.authGateway);
  }

  setAuthTokenUseCase(): SetAuthTokenUseCase {
    return new SetAuthTokenUseCase(this.crypto, this.cookieStorage);
  }

  // User use case factories
  getCurrentUserUseCase(): GetCurrentUserUseCase {
    return new GetCurrentUserUseCase(this.userGateway);
  }

  getUserUseCase(): GetUserUseCase {
    return new GetUserUseCase(this.userGateway);
  }

  updateUserUseCase(): UpdateUserUseCase {
    return new UpdateUserUseCase(this.userGateway);
  }

  updateUserEmailUseCase(): UpdateUserEmailUseCase {
    return new UpdateUserEmailUseCase(this.userGateway);
  }

  // Vacancy use case factories
  getVacancyUseCase(): GetVacancyUseCase {
    return new GetVacancyUseCase(this.vacancyGateway);
  }

  updateVacancyUseCase(): UpdateVacancyUseCase {
    return new UpdateVacancyUseCase(this.vacancyGateway);
  }

  deleteVacancyUseCase(): DeleteVacancyUseCase {
    return new DeleteVacancyUseCase(this.vacancyGateway);
  }

  publishVacancyUseCase(): PublishVacancyUseCase {
    return new PublishVacancyUseCase(this.vacancyGateway);
  }

  createVacancyUseCase(): CreateVacancyUseCase {
    return new CreateVacancyUseCase(this.vacancyGateway);
  }

  // Application use case factories
  getApplicationsUseCase(): GetApplicationsUseCase {
    return new GetApplicationsUseCase(this.applicationGateway);
  }

  createApplicationUseCase(): CreateApplicationUseCase {
    return new CreateApplicationUseCase(this.applicationGateway);
  }

  updateApplicationStatusUseCase(): UpdateApplicationStatusUseCase {
    return new UpdateApplicationStatusUseCase(this.applicationGateway);
  }

  // Company use case factories
  getCompanyUseCase(): GetCompanyUseCase {
    return new GetCompanyUseCase(this.companyGateway);
  }

  createCompanyUseCase(): CreateCompanyUseCase {
    return new CreateCompanyUseCase(this.companyGateway);
  }

  getCompanyStatisticsUseCase(): GetCompanyStatisticsUseCase {
    return new GetCompanyStatisticsUseCase(this.companyGateway);
  }

  // Dashboard use case factories
  getDashboardStatsUseCase(): GetDashboardStatsUseCase {
    return new GetDashboardStatsUseCase(this.dashboardGateway);
  }

  getCompanyStatsUseCase(): GetCompanyStatsUseCase {
    return new GetCompanyStatsUseCase(this.dashboardGateway);
  }

  getRecentApplicationsUseCase(): GetRecentApplicationsUseCase {
    return new GetRecentApplicationsUseCase(this.dashboardGateway);
  }

  // Activity use case factories
  getRecentActivitiesUseCase(): GetRecentActivitiesUseCase {
    return new GetRecentActivitiesUseCase(this.activityGateway);
  }

  getRecruitmentProcessesUseCase(): GetRecruitmentProcessesUseCase {
    return new GetRecruitmentProcessesUseCase(this.activityGateway);
  }

  // Template use case factories
  getProcessTemplatesUseCase(): GetProcessTemplatesUseCase {
    return new GetProcessTemplatesUseCase(this.templateGateway);
  }

  createProcessTemplateUseCase(): CreateProcessTemplateUseCase {
    return new CreateProcessTemplateUseCase(this.templateGateway);
  }

  getDefaultTemplatesUseCase(): GetDefaultTemplatesUseCase {
    return new GetDefaultTemplatesUseCase(this.templateGateway);
  }

  // Competence use case factories
  getCompetencesUseCase(): GetCompetencesUseCase {
    return new GetCompetencesUseCase(this.competenceGateway);
  }

  getCompetenceByIdUseCase(): GetCompetenceByIdUseCase {
    return new GetCompetenceByIdUseCase(this.competenceGateway);
  }

  createCompetenceUseCase(): CreateCompetenceUseCase {
    return new CreateCompetenceUseCase(this.competenceGateway);
  }

  updateCompetenceUseCase(): UpdateCompetenceUseCase {
    return new UpdateCompetenceUseCase(this.competenceGateway);
  }

  deleteCompetenceUseCase(): DeleteCompetenceUseCase {
    return new DeleteCompetenceUseCase(this.competenceGateway);
  }

  // Step use case factories
  getStepsUseCase(): GetStepsUseCase {
    return new GetStepsUseCase(this.stepGateway);
  }

  createStepUseCase(): CreateStepUseCase {
    return new CreateStepUseCase(this.stepGateway);
  }

  updateStepUseCase(): UpdateStepUseCase {
    return new UpdateStepUseCase(this.stepGateway);
  }

  deleteStepUseCase(): DeleteStepUseCase {
    return new DeleteStepUseCase(this.stepGateway);
  }

  reorderStepsUseCase(): ReorderStepsUseCase {
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
