
const ACCESS_TOKEN_KEY = "unifortrade.accessToken";
const REFRESH_TOKEN_KEY = "unifortrade.refreshToken";

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export function getStoredTokens(): AuthTokens | null {
  if (typeof window === "undefined") return null;

  const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = window.localStorage.getItem(REFRESH_TOKEN_KEY);

  if (!accessToken || !refreshToken) return null;
  return { accessToken, refreshToken };
}

export function storeTokens(tokens: AuthTokens): void {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  window.localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  window.dispatchEvent(new Event("unifortrade:auth-change"));
}

export function clearTokens(): void {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.dispatchEvent(new Event("unifortrade:auth-change"));
}

export const AUTH_CHANGE_EVENT = "unifortrade:auth-change";
