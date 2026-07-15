"use client";

import { useQuery } from '@tanstack/react-query';
import { Todo, ApiError } from '../types';
import { todoService } from '../services/todo.service';

export function useTodos(userId?: number | string) {
  const id = typeof userId === 'string' ? parseInt(userId, 10) : userId;
  
  return useQuery<Todo[], ApiError, Todo[]>({
    queryKey: id ? ['todos', id] : ['todos'],
    queryFn: todoService.list,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
    enabled: !!id,
  });
}
