import axios from "axios";

const refreshEnabled = () => process.env.NEXT_PUBLIC_ENABLE_REFRESH === "true";
const isBrowser = typeof window !== "undefined";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  config.headers = config.headers ?? {};

  if (config.headers.Authorization) {
    return config;
  }

  if (isBrowser) {
    try {
      const tokenResponse = await fetch("/api/auth/token");
      if (tokenResponse.ok) {
        const { token } = await tokenResponse.json();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch {
      // If token fetch fails, continue without Authorization header.
    }
    return config;
  }

  const { getAccessToken } = await import("@/lib/session");
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (t: string | null) => void;
  reject: (e: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      if (originalRequest.url?.includes("/auth/login")) {
        return Promise.reject(error);
      }

      if (!refreshEnabled()) {
        if (isBrowser && window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      if (isBrowser) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { getRefreshToken, setTokens, clearTokens } =
          await import("@/lib/session");
        const { extractTokensFromAuthPayload } =
          await import("@/lib/auth-tokens");

        const refreshToken = await getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token");

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refreshToken },
        );

        const parsed = extractTokensFromAuthPayload(data);
        if (!parsed?.accessToken) throw new Error("Invalid refresh response");

        await setTokens(
          parsed.accessToken,
          parsed.refreshToken ?? refreshToken,
        );
        processQueue(null, parsed.accessToken);

        originalRequest.headers.Authorization = `Bearer ${parsed.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        const { clearTokens } = await import("@/lib/session");
        await clearTokens();
        if (
          typeof window !== "undefined" &&
          window.location.pathname !== "/login"
        ) {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
