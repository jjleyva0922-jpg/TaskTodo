import { getRequest, postRequest, putRequest, deleteRequest } from './api';
import { Todo, UpdateTodoInput } from '../types';

export interface CreateTodoPayload {
  title: string;
  description?: string;
}

export const todoService = {
  list: async (): Promise<Todo[]> => getRequest<Todo[]>('/todos'),
  listDeleted: async (): Promise<Todo[]> => getRequest<Todo[]>('/todos/deleted'),
  get: async (id: string): Promise<Todo> => getRequest<Todo>(`/todos/${id}`),
  create: async (data: CreateTodoPayload): Promise<Todo> => postRequest<Todo>('/todos', data),
  update: async (id: string, data: UpdateTodoInput): Promise<Todo> => putRequest<Todo>(`/todos/${id}`, data),
  remove: async (id: string): Promise<void> => deleteRequest<void>(`/todos/${id}`),
};
