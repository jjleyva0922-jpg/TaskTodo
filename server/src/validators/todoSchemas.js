const { z } = require('zod');

const createTodoSchema = z.object({
  title: z.string({ error: 'Title is required' }).min(1, 'Title cannot be empty'),
  description: z.string().optional(),
  // userId is derived from the authenticated session on the server
});

const updateTodoSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty').optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

module.exports = { createTodoSchema, updateTodoSchema };
