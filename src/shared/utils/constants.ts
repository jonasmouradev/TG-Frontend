export const paths = {
  HOME: '/home',
  ACTIVITY: '/activity',
  REGISTERS: '/registers',
  INBOX: '/inbox',
  STATISTICS: '/statistics',
  CONFIGS: '/configs',
  PROFILE: '/profile',
  SIGN_UP: '/signUp',
  SIGN_IN: '/',
  CHANGE_EMAIL: '/change-email/:secret',
  ACTIVATE: '/activate/:id',
  RESET_PASSWORD: '/:secret/reset-password/:email',
} as const;
