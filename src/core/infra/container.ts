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
  SignInUseCase,
  SetAuthTokenUseCase,
  GetAuthTokenUseCase,

  // User use cases
  GetMeUseCase,
  GetUserUseCase,
  UpdateUserUseCase,
  UpdateUserEmailUseCase,

  // Vacancy use cases
  GetVacancyUseCase,
  UpdateVacancyUseCase,
  DeleteVacancyUseCase,
  PublishVacancyUseCase,
  CreateVacancyUseCase,
  GetPublishedVacancyUseCase,
  GetVacanciesUseCase,

  // Application use cases
  GetApplicationsUseCase,
  CreateApplicationUseCase,
  UpdateApplicationStatusUseCase,

  // Company use cases
  GetCompanyUseCase,
  CreateCompanyUseCase,
  SetCompanyIdUseCase,
  GetCompanyIdUseCase,
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
import { GetCurrentUserUseCase } from '@core/application/use-cases/auth/get-current-user.use-case';

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
  authenticateUser(): AuthenticateUserUseCase {
    return new AuthenticateUserUseCase(this.authGateway);
  }

  setCompanyId(): SetCompanyIdUseCase {
    return new SetCompanyIdUseCase(this.cookieStorage);
  }

  signIn(): SignInUseCase {
    return new SignInUseCase(this.crypto, this.cookieStorage);
  }

  signUp(): SignUpUseCase {
    return new SignUpUseCase(this.authGateway);
  }

  resetPassword(): ResetPasswordUseCase {
    return new ResetPasswordUseCase(this.authGateway);
  }

  refreshToken(): RefreshTokenUseCase {
    return new RefreshTokenUseCase(this.authGateway);
  }

  forgotPassword(): ForgotPasswordUseCase {
    return new ForgotPasswordUseCase(this.authGateway);
  }

  setAuthToken(): SetAuthTokenUseCase {
    return new SetAuthTokenUseCase(this.crypto, this.cookieStorage);
  }

  getCompanyId(): GetCompanyIdUseCase {
    return new GetCompanyIdUseCase(this.crypto, this.cookieStorage);
  }

  getAuthToken(): GetAuthTokenUseCase {
    return new GetAuthTokenUseCase(this.crypto, this.cookieStorage);
  }

  // User use case factories
  getCurrentUser(): GetCurrentUserUseCase {
    return new GetCurrentUserUseCase(this.crypto, this.cookieStorage);
  }

  getUser(): GetUserUseCase {
    return new GetUserUseCase(this.userGateway);
  }

  getMe(): GetMeUseCase {
    return new GetMeUseCase(this.userGateway);
  }

  updateUser(): UpdateUserUseCase {
    return new UpdateUserUseCase(this.userGateway);
  }

  updateUserEmail(): UpdateUserEmailUseCase {
    return new UpdateUserEmailUseCase(this.userGateway);
  }

  // Vacancy use case factories
  getVacancies(): GetVacanciesUseCase {
    return new GetVacanciesUseCase(this.vacancyGateway);
  }

  getVacancy(): GetVacancyUseCase {
    return new GetVacancyUseCase(this.vacancyGateway);
  }

  getVacancyPublished(): GetPublishedVacancyUseCase {
    return new GetPublishedVacancyUseCase(this.vacancyGateway);
  }

  updateVacancy(): UpdateVacancyUseCase {
    return new UpdateVacancyUseCase(this.vacancyGateway);
  }

  deleteVacancy(): DeleteVacancyUseCase {
    return new DeleteVacancyUseCase(this.vacancyGateway);
  }

  publishVacancy(): PublishVacancyUseCase {
    return new PublishVacancyUseCase(this.vacancyGateway);
  }

  createVacancy(): CreateVacancyUseCase {
    return new CreateVacancyUseCase(this.vacancyGateway);
  }

  // Application use case factories
  getApplications(): GetApplicationsUseCase {
    return new GetApplicationsUseCase(this.applicationGateway);
  }

  createApplication(): CreateApplicationUseCase {
    return new CreateApplicationUseCase(this.applicationGateway);
  }

  updateApplicationStatus(): UpdateApplicationStatusUseCase {
    return new UpdateApplicationStatusUseCase(this.applicationGateway);
  }

  // Company use case factories
  getCompany(): GetCompanyUseCase {
    return new GetCompanyUseCase(this.companyGateway);
  }

  createCompany(): CreateCompanyUseCase {
    return new CreateCompanyUseCase(this.companyGateway);
  }

  getCompanyStatistics(): GetCompanyStatisticsUseCase {
    return new GetCompanyStatisticsUseCase(this.companyGateway);
  }

  // Dashboard use case factories
  getDashboardStats(): GetDashboardStatsUseCase {
    return new GetDashboardStatsUseCase(this.dashboardGateway);
  }

  getCompanyStats(): GetCompanyStatsUseCase {
    return new GetCompanyStatsUseCase(this.dashboardGateway);
  }

  getRecentApplications(): GetRecentApplicationsUseCase {
    return new GetRecentApplicationsUseCase(this.dashboardGateway);
  }

  // Activity use case factories
  getRecentActivities(): GetRecentActivitiesUseCase {
    return new GetRecentActivitiesUseCase(this.activityGateway);
  }

  getRecruitmentProcesses(): GetRecruitmentProcessesUseCase {
    return new GetRecruitmentProcessesUseCase(this.activityGateway);
  }

  // Template use case factories
  getProcessTemplates(): GetProcessTemplatesUseCase {
    return new GetProcessTemplatesUseCase(this.templateGateway);
  }

  createProcessTemplate(): CreateProcessTemplateUseCase {
    return new CreateProcessTemplateUseCase(this.templateGateway);
  }

  getDefaultTemplates(): GetDefaultTemplatesUseCase {
    return new GetDefaultTemplatesUseCase(this.templateGateway);
  }

  // Competence use case factories
  getCompetences(): GetCompetencesUseCase {
    return new GetCompetencesUseCase(this.competenceGateway);
  }

  getCompetenceById(): GetCompetenceByIdUseCase {
    return new GetCompetenceByIdUseCase(this.competenceGateway);
  }

  createCompetence(): CreateCompetenceUseCase {
    return new CreateCompetenceUseCase(this.competenceGateway);
  }

  updateCompetence(): UpdateCompetenceUseCase {
    return new UpdateCompetenceUseCase(this.competenceGateway);
  }

  deleteCompetence(): DeleteCompetenceUseCase {
    return new DeleteCompetenceUseCase(this.competenceGateway);
  }

  // Step use case factories
  getSteps(): GetStepsUseCase {
    return new GetStepsUseCase(this.stepGateway);
  }

  createStep(): CreateStepUseCase {
    return new CreateStepUseCase(this.stepGateway);
  }

  updateStep(): UpdateStepUseCase {
    return new UpdateStepUseCase(this.stepGateway);
  }

  deleteStep(): DeleteStepUseCase {
    return new DeleteStepUseCase(this.stepGateway);
  }

  reorderSteps(): ReorderStepsUseCase {
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
