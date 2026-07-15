const todoService = require('../services/todoService');
const { createTodoSchema, updateTodoSchema } = require('../validators/todoSchemas');

const todoController = {
  // Get all todos
  getAllTodos: async (req, res) => {
    try {
      const userId = req.user?.id;
      console.log(`[todos] getAllTodos requested by userId=${userId}`);
      const todos = await todoService.getAllTodos(userId);
      console.log(`[todos] GET /todos - returned ${todos.length} todos for userId=${userId}`);
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get deleted todos
  getDeletedTodos: async (req, res) => {
    try {
      const userId = req.user?.id;
      console.log(`[todos] getDeletedTodos requested by userId=${userId}`);
      const todos = await todoService.getDeletedTodos(userId);
      console.log(`[todos] GET /todos/deleted - returned ${todos.length} deleted todos for userId=${userId}`);
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get single todo
  getTodoById: async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
    try {
      const userId = req.user?.id;
      console.log(`[todos] getTodoById ${id} requested by userId=${userId}`);
      const todo = await todoService.getTodoById(id, userId);
      if (!todo) return res.status(404).json({ error: 'Todo not found' });
      console.log(`GET /todos/${id} - found todo id=${id}`);
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create a new todo
  createTodo: async (req, res) => {
    try {
      const parsed = createTodoSchema.parse(req.body);
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });
      const payload = { ...parsed, userId };
      console.log(`[todos] createTodo by userId=${userId} payload:`, parsed);
      const todo = await todoService.createTodo(payload);
      console.log(`POST /todos - created id=${todo.id}`);
      res.status(201).json(todo);
    } catch (error) {
      const msg = error?.errors || error?.message || String(error);
      res.status(400).json({ error: msg });
    }
  },

  // Update todo
  updateTodo: async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
    try {
      const parsed = updateTodoSchema.parse(req.body);
      const userId = req.user?.id;
      console.log(`[todos] updateTodo ${id} requested by userId=${userId} payload:`, parsed);
      const updated = await todoService.updateTodo(id, parsed, userId);
      console.log(`PATCH /todos/${id} - updated`);
      res.json(updated);
    } catch (error) {
      const msg = error?.message || String(error);
      res.status(400).json({ error: msg });
    }
  },

  // Delete todo
  deleteTodo: async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
    try {
      const userId = req.user?.id;
      console.log(`[todos] deleteTodo ${id} requested by userId=${userId}`);
      await todoService.deleteTodo(id, userId);
      console.log(`DELETE /todos/${id} - deleted`);
      res.json({ message: 'Todo deleted', id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = todoController;
