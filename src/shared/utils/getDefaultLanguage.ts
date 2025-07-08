export function getDefaultLanguage(): string {
  const browserLanguage = navigator.language || navigator.languages[0];
  const supportedLanguages = ['pt', 'en'];

  if (supportedLanguages.includes(browserLanguage)) return browserLanguage;

  return 'en';
}
