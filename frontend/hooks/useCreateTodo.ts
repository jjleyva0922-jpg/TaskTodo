"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo, ApiError } from '../types';
import { todoService, CreateTodoPayload } from '../services/todo.service';

export function useCreateTodo(userId?: number | string, onSuccess?: (data: Todo) => void, onError?: (error: ApiError) => void) {
  const queryClient = useQueryClient();
  const id = typeof userId === 'string' ? parseInt(userId, 10) : userId;

  return useMutation<Todo, ApiError, CreateTodoPayload>({
    mutationFn: todoService.create,
    onSuccess: (data) => {
      if (id) queryClient.invalidateQueries({ queryKey: ['todos', id] });
      onSuccess?.(data);
    },
    onError,
  });
}
