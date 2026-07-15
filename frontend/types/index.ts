// User types
export interface User {
  id: number;
  email: string;
  name: string | null;
}

// Todo types
export interface Todo {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  userId: number;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
  userId: number;
}

export interface UpdateTodoInput {
  title?: string;
  description?: string;
  completed?: boolean;
}

// Project types
export interface Project {
  id: number;
  name: string;
  description: string | null;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: 'pending' | 'in_progress' | 'completed';
  projectId: number;
  project: Project;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string | string[];
  message?: string;
}

// API Error types
export interface ApiError {
  status: number;
  message: string;
  data?: unknown;
  originalError?: Error;
}

// Hook state types
export interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

export interface UseAsyncActions<T> {
  setData: (data: T) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: ApiError | null) => void;
}
