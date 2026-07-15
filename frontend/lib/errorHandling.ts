/**
 * API Error Response Handlers
 * Utility functions for handling different types of API errors
 */

/**
 * Handle and log errors for debugging
 */
export function logError(error: unknown, context?: string): void {
  console.error(`${context ? `[${context}]` : ''} Error:`, error);
}

/**
 * Check if value is an error object
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

/**
 * Retry async function with exponential backoff
 */
export async function retryAsync<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = isError(error) ? error : new Error(String(error));

      if (attempt < maxAttempts) {
        const delay = delayMs * Math.pow(2, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error('Unknown error');
}

/**
 * Create error boundary data
 */
export function createErrorBoundary(error: Error, errorInfo: { componentStack: string }) {
  return {
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo.componentStack,
    timestamp: new Date().toISOString(),
  };
}
