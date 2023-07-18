export function createLoginUrl(redirectTo?: string): string {
  if (redirectTo) {
    return `/api/login?redirectTo=${encodeURIComponent(redirectTo)}`;
  }
  return `/api/login`;
}

export function createUpgradeUrl(redirectTo?: string): string {
  if (redirectTo) {
    return `/account?page=plan&redirectTo=${encodeURIComponent(redirectTo)}`;
  }
  return `/account?page=plan`;
}

export function createLogoutUrl(redirectTo?: string): string {
  if (redirectTo) {
    return `/api/logout?redirectTo=${encodeURIComponent(redirectTo)}`;
  }
  return `/api/logout`;
}
