const prisma = require('../lib/prisma');

const todoService = {
  // Get all todos
  getAllTodos: async (userId) => {
    return await prisma.todo.findMany({
      where: { userId, isDeleted: false },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
  },

  // Get deleted todos
  getDeletedTodos: async (userId) => {
    return await prisma.todo.findMany({
      where: { userId, isDeleted: true },
      include: { user: true },
      orderBy: { deletedAt: 'desc' },
    });
  },

  // Get single todo by ID
  getTodoById: async (id, userId) => {
    return await prisma.todo.findFirst({
      where: { id, userId, isDeleted: false },
      include: { user: true },
    });
  },

  // Create a new todo
  createTodo: async (data) => {
    return await prisma.todo.create({
      data,
      include: { user: true },
    });
  },

  // Update a todo
  updateTodo: async (id, data, userId) => {
    // Ensure the todo belongs to the user
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo || todo.userId !== userId || todo.isDeleted) {
      throw new Error('Todo not found or unauthorized');
    }

    return await prisma.todo.update({
      where: { id },
      data,
      include: { user: true },
    });
  },

  // Delete a todo
  deleteTodo: async (id, userId) => {
    // Soft-delete: set isDeleted and deletedAt
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo || todo.userId !== userId || todo.isDeleted) {
      throw new Error('Todo not found or unauthorized');
    }

    return await prisma.todo.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }
};

module.exports = todoService;
