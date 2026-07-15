"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../hooks/useAuth';
import { useTodos } from '../../../hooks/useTodos';
import { useCreateTodo } from '../../../hooks/useCreateTodo';
import { useUpdateTodo } from '../../../hooks/useUpdateTodo';
import { useDeleteTodo } from '../../../hooks/useDeleteTodo';
import CreateEditTodoModal from '../../../components/todos/CreateEditTodoModal';
import TodoTable from '../../../components/todos/TodoTable';
import TodoEmptyState from '../../../components/todos/TodoEmptyState';
import TodoStats from '../../../components/todos/TodoStats';
import TodoFilters, { TodoFilterOption, TodoSortOption } from '../../../components/todos/TodoFilters';
import TodoSearch from '../../../components/todos/TodoSearch';
import DeleteTodoModal from '../../../components/todos/DeleteTodoModal';
import { Todo } from '../../../types';
import { TodoFormValues } from '../../../lib/validation/todo';

export default function TodosPage() {
  const router = useRouter();
  const { isAuthenticated, loading, user } = useAuth();
  const userId = user?.id;
  const { data: todos = [], isLoading, isError, error } = useTodos(userId);
  const createTodo = useCreateTodo(userId);
  const updateTodo = useUpdateTodo(userId);
  const deleteTodo = useDeleteTodo(userId);

  const [editingTodo, setEditingTodo] = useState<Todo | null | 'create'>(null);
  const [deleteTarget, setDeleteTarget] = useState<Todo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<TodoFilterOption>('all');
  const [sort, setSort] = useState<TodoSortOption>('newest');

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [loading, isAuthenticated, router]);

  const mapTodoFormToUpdate = (values: TodoFormValues) => ({
    title: values.title,
    description: values.description ?? undefined,
    completed: values.completed,
  });

  const handleSubmit = async (values: TodoFormValues) => {
    if (editingTodo && editingTodo !== 'create') {
      updateTodo.mutate(
        { id: editingTodo.id, data: mapTodoFormToUpdate(values) },
        {
          onSuccess: () => {
            setEditingTodo(null);
          },
        }
      );
      return;
    }

    createTodo.mutate(
      {
        title: values.title,
        description: values.description ?? undefined,
      },
      {
        onSuccess: () => {
          setEditingTodo(null);
        },
      }
    );
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  const handleToggleComplete = (todo: Todo) => {
    updateTodo.mutate({ id: todo.id, data: { completed: !todo.completed } });
  };

  const handleDelete = (todo: Todo) => {
    setDeleteTarget(todo);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteTodo.mutate(deleteTarget.id, {
      onSuccess: () => {
        setDeleteTarget(null);
      },
    });
  };

  const pendingAction =
    createTodo.status === 'pending' || updateTodo.status === 'pending' || deleteTodo.status === 'pending';

  // Client-side filtering and searching
  const filteredTodos = todos
    .filter((todo) => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = todo.title.toLowerCase().includes(query);
        const matchesDescription = (todo.description || '').toLowerCase().includes(query);
        if (!matchesTitle && !matchesDescription) return false;
      }

      // Status filter
      if (filter === 'pending' && todo.completed) return false;
      if (filter === 'completed' && !todo.completed) return false;

      return true;
    })
    .sort((a, b) => {
      if (sort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sort === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sort === 'alphabetical') return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">Todos</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
            Manage your tasks efficiently. Stay organized and get things done.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEditingTodo('create')}
          className="w-full sm:w-auto rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 flex items-center justify-center gap-2"
        >
          <span>+ Create todo</span>
        </button>
      </div>

      {/* Stats Cards */}
      <TodoStats todos={todos} userId={userId} />

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <TodoSearch value={searchQuery} onChange={setSearchQuery} />
        <TodoFilters filter={filter} sort={sort} onFilterChange={setFilter} onSortChange={setSort} />
      </div>

      {/* Todos Table/Empty State */}
      {isError ? (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-800 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-200">
          <p>Unable to load todos.</p>
          <p className="mt-2 text-slate-600 dark:text-slate-400">{error?.message || 'Please refresh the page or try again later.'}</p>
        </div>
      ) : todos.length === 0 && !isLoading ? (
        <TodoEmptyState onCreate={() => setEditingTodo('create')} />
      ) : filteredTodos.length === 0 && !isLoading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
          No todos match your search or filter.
        </div>
      ) : (
        <TodoTable
          todos={filteredTodos}
          loading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleComplete={handleToggleComplete}
        />
      )}

      {/* Create/Edit Modal */}
      <CreateEditTodoModal
        open={editingTodo !== null}
        editingTodo={editingTodo === 'create' ? null : editingTodo}
        loading={pendingAction}
        onClose={handleCancelEdit}
        onSubmit={handleSubmit}
      />

      {/* Delete Modal */}
      <DeleteTodoModal
        open={Boolean(deleteTarget)}
        title={deleteTarget?.title ?? ''}
        loading={deleteTodo.status === 'pending'}
        onConfirm={confirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
