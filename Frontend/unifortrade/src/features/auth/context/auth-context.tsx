"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { mutate as globalMutate } from "swr";
import { login as loginRequest } from "@/lib/api/generated/auth-controller/auth-controller";
import { logout as logoutRequest } from "@/lib/api/generated/auth-controller/auth-controller";
import { create as createUserRequest } from "@/lib/api/generated/user-controller/user-controller";
import type { CreateUserRequest } from "@/lib/api/generated/models";
import { decodeAccessToken } from "@/lib/auth/jwt";
import {
  AUTH_CHANGE_EVENT,
  clearTokens,
  getStoredTokens,
  storeTokens,
} from "@/lib/auth/token-storage";

export type AuthUser = {
  id: number;
  uniforId: string;
};

export type AuthStatus = "authenticated" | "anonymous";

type AuthContextValue = {
  status: AuthStatus;
  user: AuthUser | null;
  login: (uniforId: string, password: string) => Promise<void>;
  register: (payload: CreateUserRequest) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

let cachedAccessToken: string | null = null;
let cachedUser: AuthUser | null = null;

function readUserFromStorage(): AuthUser | null {
  const tokens = getStoredTokens();

  if (!tokens) {
    cachedAccessToken = null;
    cachedUser = null;
    return null;
  }

  if (tokens.accessToken === cachedAccessToken) {
    return cachedUser;
  }

  const claims = decodeAccessToken(tokens.accessToken);
  cachedAccessToken = tokens.accessToken;
  cachedUser = claims ? { id: claims.uid, uniforId: claims.sub } : null;
  return cachedUser;
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(AUTH_CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getServerSnapshot(): AuthUser | null {
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const user = useSyncExternalStore(subscribe, readUserFromStorage, getServerSnapshot);
  const status: AuthStatus = user ? "authenticated" : "anonymous";

  const login = useCallback(async (uniforId: string, password: string) => {
    const auth = await loginRequest({ uniforId, password });
    if (!auth.accessToken || !auth.refreshToken) {
      throw new Error("Login response had no tokens.");
    }
    storeTokens({ accessToken: auth.accessToken, refreshToken: auth.refreshToken });
  }, []);

  const register = useCallback(
    async (payload: CreateUserRequest) => {
      await createUserRequest(payload);
      if (!payload.uniforId || !payload.password) {
        throw new Error("uniforId and password are required.");
      }
      await login(payload.uniforId, payload.password);
    },
    [login]
  );

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } catch {
    } finally {
      clearTokens();
      await globalMutate(() => true, undefined, { revalidate: false });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ status, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
