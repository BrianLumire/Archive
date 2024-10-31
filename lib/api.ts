import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
export const base_url = "https://gmotivate.mwalimufinder.com/api/v1";
export const baseUrl = "https://gmotivate.mwalimufinder.com";
const api = axios.create({
  baseURL: base_url,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = Cookies.get("refreshToken");

      if (!refreshToken) {
        isRefreshing = false;
        // Redirect to sign-in page
        if (typeof window !== "undefined") {
          window.location.href = "/admin/auth/signin";
        }
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${base_url}/auth/refresh-token/`, {
          refresh: refreshToken,
        });

        const { access, refresh } = response.data;
        Cookies.set("token", access);
        Cookies.set("refreshToken", refresh);

        api.defaults.headers.common["Authorization"] = "Bearer " + access;
        originalRequest.headers["Authorization"] = "Bearer " + access;

        processQueue(null, access);
        isRefreshing = false;

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        isRefreshing = false;

        // Clear cookies and redirect to sign-in page
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        if (typeof window !== "undefined") {
          window.location.href = "/admin/auth/signin";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { api };
