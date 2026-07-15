import { ApiError } from '@/types';
import axios, { AxiosError } from 'axios';

/**
 * Parse API error response and create standardized ApiError
 */
function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'message' in error
  );
}

export function parseApiError(error: unknown): ApiError {
  if (isApiError(error)) {
    return error;
  }

  // Axios error
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ error?: string | string[] | Record<string, unknown>; message?: string | Record<string, unknown> }>;
    const status = axiosError.response?.status || 500;
    const rawMessage =
      axiosError.response?.data?.message ||
      axiosError.response?.data?.error ||
      axiosError.message ||
      'An unknown error occurred';

    let message = 'An unknown error occurred';
    if (typeof rawMessage === 'string') {
      message = rawMessage;
    } else if (Array.isArray(rawMessage)) {
      message = rawMessage.join(', ');
    } else if (typeof rawMessage === 'object' && rawMessage !== null) {
      const extracted = Object.values(rawMessage).find((value) => typeof value === 'string');
      message = extracted ? extracted : JSON.stringify(rawMessage);
    } else {
      message = String(rawMessage);
    }

    return {
      status,
      message,
      data: axiosError.response?.data,
      originalError: error,
    };
  }

  // Native Error
  if (error instanceof Error) {
    return {
      status: 500,
      message: error.message || 'An unknown error occurred',
      originalError: error,
    };
  }

  // Unknown error type
  return {
    status: 500,
    message: String(error) || 'An unknown error occurred',
  };
}

/**
 * Format error message for display to users
 */
export function formatErrorMessage(error: ApiError): string {
  const statusMessages: Record<number, string> = {
    400: 'Invalid request. Please check your input.',
    401: 'Unauthorized. Please log in.',
    403: 'Forbidden. You do not have permission to access this.',
    404: 'Not found. The resource does not exist.',
    500: 'Server error. Please try again later.',
    503: 'Service unavailable. Please try again later.',
  };

  return statusMessages[error.status] || error.message || 'An error occurred';
}

/**
 * Check if error is a network error (no connectivity)
 */
export function isNetworkError(error: ApiError): boolean {
  const message = error.message.toLowerCase();
  return (
    error.status === 0 ||
    message.includes('network') ||
    message.includes('failed to fetch') ||
    message.includes('connection refused') ||
    message.includes('timeout')
  );
}

/**
 * Check if error is a validation error (400)
 */
export function isValidationError(error: ApiError): boolean {
  return error.status === 400;
}

/**
 * Check if error is an authentication error (401)
 */
export function isAuthError(error: ApiError): boolean {
  return error.status === 401;
}

/**
 * Check if error is a server error (5xx)
 */
export function isServerError(error: ApiError): boolean {
  return error.status >= 500;
}
