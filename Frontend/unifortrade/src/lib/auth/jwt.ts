
type AccessTokenClaims = {
  sub: string;
  uid: number;
  exp: number;
};

export function decodeAccessToken(token: string): AccessTokenClaims | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(base64);
    const claims = JSON.parse(json) as Partial<AccessTokenClaims>;

    if (typeof claims.sub !== "string" || typeof claims.uid !== "number") {
      return null;
    }

    return {
      sub: claims.sub,
      uid: claims.uid,
      exp: claims.exp ?? 0,
    };
  } catch {
    return null;
  }
}

export function isAccessTokenExpired(claims: AccessTokenClaims): boolean {
  return claims.exp * 1000 <= Date.now();
}
