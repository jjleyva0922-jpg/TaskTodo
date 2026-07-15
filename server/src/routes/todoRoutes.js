const express = require('express');
const todoController = require('../controllers/todoController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Protect all todo routes
router.use(authMiddleware);

// Get all todos
router.get('/', todoController.getAllTodos);

// Get deleted todos
router.get('/deleted', todoController.getDeletedTodos);

// Get single todo
router.get('/:id', todoController.getTodoById);

// Create a new todo
router.post('/', todoController.createTodo);

// Update todo (PUT or PATCH)
router.put('/:id', todoController.updateTodo);
router.patch('/:id', todoController.updateTodo);

// Delete todo
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
