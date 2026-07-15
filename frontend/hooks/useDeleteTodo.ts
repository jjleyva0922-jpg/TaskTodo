"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '../types';
import { todoService } from '../services/todo.service';

export function useDeleteTodo(userId?: number | string, onSuccess?: () => void, onError?: (error: ApiError) => void) {
  const queryClient = useQueryClient();
  const id = typeof userId === 'string' ? parseInt(userId, 10) : userId;

  return useMutation<void, ApiError, number>({
    mutationFn: (todoId: number) => todoService.remove(String(todoId)),
    onSuccess: () => {
      if (id) queryClient.invalidateQueries({ queryKey: ['todos', id] });
      onSuccess?.();
    },
    onError,
  });
}
