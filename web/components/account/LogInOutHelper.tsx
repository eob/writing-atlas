export function createLoginUrl(redirectTo?: string): string {
  if (redirectTo) {
    return `/api/auth/login?returnTo=${encodeURIComponent(redirectTo)}`;
  }
  return `/api/auth/login`;
}

export function createUpgradeUrl(redirectTo?: string): string {
  // if (redirectTo) {
  //   return `/account?page=plan&returnTo=${encodeURIComponent(redirectTo)}`;
  // }
  // return `/account?page=plan`;
  return "mailto:contact@writingatlas.com"
}

export function createLogoutUrl(redirectTo?: string): string {
  if (redirectTo) {
    return `/api/auth/logout?returnTo=${encodeURIComponent(redirectTo)}`;
  }
  return `/api/auth/logout`;
}

export function createDashboardUrl(redirectTo?: string): string {
  if (redirectTo) {
     return `/account?page=Dashboard&returnTo=${encodeURIComponent(redirectTo)}`;
   }
   return `/account?page=Dashboard`;
  
}
