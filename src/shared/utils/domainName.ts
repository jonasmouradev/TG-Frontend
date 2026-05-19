export const domainName = (() => {
  const hostname = globalThis.location.hostname;
  const isDevelopmentDomain = hostname.includes('beta');
  const jumpNumber = isDevelopmentDomain ? -3 : -2;
  const domain = hostname.split('.').slice(jumpNumber).join('.');
  return domain;
})();
