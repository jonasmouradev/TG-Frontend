export function getDefaultLanguage(): string {
  const browserLanguage = navigator.language || navigator.languages[0];
  const supportedLanguages = ["pt", "en", "pt-BR", "en-US"];

  if (supportedLanguages.includes(browserLanguage)) {
    return browserLanguage;
  }

  return "en";
}
