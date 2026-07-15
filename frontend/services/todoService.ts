import { getRequest, postRequest, putRequest, deleteRequest } from './api';
import { Todo } from '../types';

export const todoService = {
  list: async (): Promise<Todo[]> => getRequest<Todo[]>('/todos'),
  get: async (id: string): Promise<Todo> => getRequest<Todo>(`/todos/${id}`),
  create: async (data: Partial<Todo>): Promise<Todo> => postRequest<Todo>('/todos', data),
  update: async (id: string, data: Partial<Todo>): Promise<Todo> => putRequest<Todo>(`/todos/${id}`, data),
  remove: async (id: string): Promise<void> => deleteRequest<void>(`/todos/${id}`),
};

