"use client";

import { Todo, CreateTodoInput, UpdateTodoInput, ApiError } from '../types';
import { useMutation, useQuery } from './useAsync';
import { todoService } from '../services/todoService';

/**
 * Hook to fetch all todos
 */
export function useTodos(onError?: (error: ApiError) => void) {
  return useQuery(() => todoService.list(), undefined, onError);
}

/**
 * Hook to fetch a single todo by ID
 */
export function useTodo(id: number | null, onError?: (error: ApiError) => void) {
  const query = useQuery(
    () => (id ? todoService.get(String(id)) : Promise.reject(new Error('No ID provided'))),
    undefined,
    onError
  );

  return {
    ...query,
    isReady: id !== null,
  };
}

/**
 * Hook to create a todo
 */
export function useCreateTodo(onSuccess?: (data: Todo) => void, onError?: (error: ApiError) => void) {
  return useMutation((input: CreateTodoInput) => todoService.create(input as any), onSuccess, onError);
}

/**
 * Hook to update a todo
 */
export function useUpdateTodo(onSuccess?: (data: Todo) => void, onError?: (error: ApiError) => void) {
  return useMutation(
    (input: { id: number; data: UpdateTodoInput }) => todoService.update(String(input.id), input.data as any),
    onSuccess,
    onError
  );
}

/**
 * Hook to delete a todo
 */
export function useDeleteTodo(
  onSuccess?: (data: { message: string; id: number }) => void,
  onError?: (error: ApiError) => void
) {
  return useMutation(
    (id: number) =>
      todoService.remove(String(id)).then(() => ({ message: 'deleted', id })),
    onSuccess,
    onError
  );
}

/**
 * Hook to toggle todo completion status
 */
export function useToggleTodo(onSuccess?: (data: Todo) => void, onError?: (error: ApiError) => void) {
  return useMutation(
    async (input: { id: number; completed: boolean }) => {
      return todoService.update(String(input.id), { completed: input.completed } as any);
    },
    onSuccess,
    onError
  );
}
