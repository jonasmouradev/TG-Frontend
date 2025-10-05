export const paths = {
  HOME: '/home',
  ACTIVITY: '/activity',
  REGISTERS: '/registers',
  INBOX: '/inbox',
  STATISTICS: '/statistics',
  SETTINGS: '/settings',
  PROFILE: '/profile',
  SIGN_UP: '/signUp',
  SIGN_IN: '/',
  CHANGE_EMAIL: '/change-email/:secret',
  ACTIVATE: '/activate/:id',
  RESET_PASSWORD: '/:secret/reset-password/:email',
  NEW_VACANCY: '/vacancies/new',
} as const;

export type Paths = keyof typeof paths;
