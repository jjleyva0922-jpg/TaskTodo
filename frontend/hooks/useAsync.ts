'use client';

import { useCallback, useState } from 'react';
import { UseAsyncState, ApiError } from '@/types';
import { parseApiError } from '@/lib/errors';

/**
 * Generic hook for handling async operations with loading and error states
 * @param asyncFunction - The async function to execute
 * @param onSuccess - Optional callback on success
 * @param onError - Optional callback on error
 */
export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  onSuccess?: (data: T) => void,
  onError?: (error: ApiError) => void
) {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const result = await asyncFunction();
      setState({ data: result, loading: false, error: null });
      onSuccess?.(result);
      return result;
    } catch (error) {
      const apiError = parseApiError(error);
      setState({ data: null, loading: false, error: apiError });
      onError?.(apiError);
      throw apiError;
    }
  }, [asyncFunction, onSuccess, onError]);

  return {
    ...state,
    execute,
  };
}

/**
 * Hook for mutation operations (POST, PATCH, DELETE)
 * @param mutationFunction - The async mutation function
 * @param onSuccess - Optional callback on success
 * @param onError - Optional callback on error
 */
export function useMutation<TInput, TOutput>(
  mutationFunction: (input: TInput) => Promise<TOutput>,
  onSuccess?: (data: TOutput) => void,
  onError?: (error: ApiError) => void
) {
  const [state, setState] = useState<UseAsyncState<TOutput>>({
    data: null,
    loading: false,
    error: null,
  });

  const mutate = useCallback(
    async (input: TInput) => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await mutationFunction(input);
        setState({ data: result, loading: false, error: null });
        onSuccess?.(result);
        return result;
      } catch (error) {
        const apiError = parseApiError(error);
        setState({ data: null, loading: false, error: apiError });
        onError?.(apiError);
        throw apiError;
      }
    },
    [mutationFunction, onSuccess, onError]
  );

  return {
    ...state,
    mutate,
  };
}

/**
 * Hook for query operations (GET) with automatic execution
 * @param queryFunction - The async query function
 * @param onSuccess - Optional callback on success
 * @param onError - Optional callback on error
 */
export function useQuery<T>(
  queryFunction: () => Promise<T>,
  onSuccess?: (data: T) => void,
  onError?: (error: ApiError) => void
) {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const refetch = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const result = await queryFunction();
      setState({ data: result, loading: false, error: null });
      onSuccess?.(result);
      return result;
    } catch (error) {
      const apiError = parseApiError(error);
      setState({ data: null, loading: false, error: apiError });
      onError?.(apiError);
      throw apiError;
    }
  }, [queryFunction, onSuccess, onError]);

  // Auto-execute on mount
  useState(() => {
    refetch();
  });

  return {
    ...state,
    refetch,
  };
}
