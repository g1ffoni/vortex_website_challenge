import axios, { AxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";
import { clearTokens, getStoredTokens, storeTokens } from "@/lib/auth/token-storage";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:8080";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  paramsSerializer: { indexes: null },
});

type ApiErrorBody = {
  message?: string;
  details?: string[];
};

export class ApiError extends Error {
  readonly status: number;
  readonly details: string[];
  readonly body: unknown;

  constructor(status: number, body: unknown) {
    const parsed = isApiErrorBody(body) ? body : undefined;
    super(parsed?.message ?? `Request failed with status ${status}`);
    this.name = "ApiError";
    this.status = status;
    this.details = parsed?.details ?? [];
    this.body = body;
  }
}

function isApiErrorBody(body: unknown): body is ApiErrorBody {
  return typeof body === "object" && body !== null;
}

const isAuthEndpoint = (url?: string) => Boolean(url?.startsWith("/auth/"));

axiosInstance.interceptors.request.use((config) => {
  const tokens = getStoredTokens();
  if (tokens && !config.headers.has("Authorization")) {
    config.headers.set("Authorization", `Bearer ${tokens.accessToken}`);
  }
  return config;
});

let refreshPromise: Promise<string | null> | null = null;

function refreshAccessToken(): Promise<string | null> {
  const tokens = getStoredTokens();
  if (!tokens) return Promise.resolve(null);

  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${API_BASE_URL}/auth/refresh`, { refreshToken: tokens.refreshToken })
      .then((response) => {
        storeTokens({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });
        return response.data.accessToken as string;
      })
      .catch(() => null)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

type RetryableConfig = InternalAxiosRequestConfig & { _retried?: boolean };

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetryableConfig | undefined;
    const status = error.response?.status;

    if (status === 401 && config && !config._retried && !isAuthEndpoint(config.url) && getStoredTokens()) {
      config._retried = true;
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        config.headers.set("Authorization", `Bearer ${newAccessToken}`);
        return axiosInstance(config);
      }
      clearTokens();
    }

    throw new ApiError(status ?? 0, error.response?.data);
  }
);

export const apiFetch = <T,>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  return axiosInstance({ ...config, ...options }).then((response) => response.data);
};
