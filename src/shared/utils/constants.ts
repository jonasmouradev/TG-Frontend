import { PaginatedList } from '@core/domain/entities';

export const paths = {
  HOME: '/home',
  ACTIVITY: '/activity',
  REGISTERS: '/registers',
  INBOX: '/inbox',
  STATISTICS: '/statistics',
  SETTINGS: '/settings',
  PROFILE: '/profile',
  SIGN_UP: '/signUp',
  SIGN_IN: '/signIn',
  CHANGE_EMAIL: '/change-email/:secret',
  ACTIVATE: '/activate/:id',
  RESET_PASSWORD: '/:secret/reset-password/:email',
  NEW_VACANCY: '/vacancies/new',
  ACTIVE_VACANCIES: '/vacancies/active',
  SCHEDULING: '/vacancies/scheduling',
  CANDIDATE_REGISTRATION: '/candidates/registration',
  VACANCY_APPLICATION: '/vacancy/:id/application',
} as const;

export type Paths = keyof typeof paths;

export const MINUTE_IN_MILLISECONDS = 60 * 1000;

export const emptyPaginatedList: PaginatedList<unknown> = {
  data: [],
  meta: {
    total: 0,
    perPage: 10,
    currentPage: 1,
    lastPage: 1,
  },
} as const;

export const COOKIES = {
  AUTH: 'authToken',
  COMPANY_ID: 'companyId',
  EXPIRES_IN: 'expiresIn',
  USER: 'user',
} as const;
