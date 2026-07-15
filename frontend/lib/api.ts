'use client';

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { parseApiError } from './errors';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://backendtask-nine.vercel.app';

/**
 * Create and configure Axios instance
 */
export function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /**
   * Request interceptor
   */
  client.interceptors.request.use(
    (config) => {
      // Add authentication token if available (for future implementation)
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(parseApiError(error));
    }
  );

  /**
   * Response interceptor
   */
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      const apiError = parseApiError(error);

      // Handle specific status codes
      if (apiError.status === 401) {
        // Unauthorized - clear token and redirect to login (future implementation)
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
          // window.location.href = '/login';
        }
      }

      return Promise.reject(apiError);
    }
  );

  return client;
}

// Create singleton instance
let apiClient: AxiosInstance;

/**
 * Get or create API client instance
 */
export function getApiClient(): AxiosInstance {
  if (!apiClient) {
    apiClient = createApiClient();
  }
  return apiClient;
}

/**
 * Generic API request wrapper with error handling
 */
export async function apiRequest<T = unknown>(
  config: AxiosRequestConfig
): Promise<{ data: T; status: number }> {
  try {
    const client = getApiClient();
    const response: AxiosResponse<T> = await client(config);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    throw parseApiError(error);
  }
}

/**
 * GET request helper
 */
export async function apiGet<T = unknown>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const { data } = await apiRequest<T>({
      ...config,
      method: 'GET',
      url,
    });
    return data;
  } catch (error) {
    throw parseApiError(error);
  }
}

/**
 * POST request helper
 */
export async function apiPost<T = unknown>(
  url: string,
  payload?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const { data } = await apiRequest<T>({
      ...config,
      method: 'POST',
      url,
      data: payload,
    });
    return data;
  } catch (error) {
    throw parseApiError(error);
  }
}

/**
 * PATCH request helper
 */
export async function apiPatch<T = unknown>(
  url: string,
  payload?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const { data } = await apiRequest<T>({
      ...config,
      method: 'PATCH',
      url,
      data: payload,
    });
    return data;
  } catch (error) {
    throw parseApiError(error);
  }
}

/**
 * PUT request helper
 */
export async function apiPut<T = unknown>(
  url: string,
  payload?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const { data } = await apiRequest<T>({
      ...config,
      method: 'PUT',
      url,
      data: payload,
    });
    return data;
  } catch (error) {
    throw parseApiError(error);
  }
}

/**
 * DELETE request helper
 */
export async function apiDelete<T = unknown>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const { data } = await apiRequest<T>({
      ...config,
      method: 'DELETE',
      url,
    });
    return data;
  } catch (error) {
    throw parseApiError(error);
  }
}
