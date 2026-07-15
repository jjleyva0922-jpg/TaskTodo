"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo, ApiError, UpdateTodoInput } from '../types';
import { todoService } from '../services/todo.service';

export function useUpdateTodo(userId?: number | string, onSuccess?: (data: Todo) => void, onError?: (error: ApiError) => void) {
  const queryClient = useQueryClient();
  const id = typeof userId === 'string' ? parseInt(userId, 10) : userId;

  return useMutation<Todo, ApiError, { id: number; data: UpdateTodoInput }>({
    mutationFn: ({ id, data }) => todoService.update(String(id), data),
    onSuccess: (data) => {
      if (id) queryClient.invalidateQueries({ queryKey: ['todos', id] });
      onSuccess?.(data);
    },
    onError,
  });
}
