const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/TodoController');

const todoController = new TodoController();

router.get('/', todoController.list);
router.get('/new', todoController.new);
router.post('/create', todoController.create);
router.get('/edit/:id', todoController.edit);
router.post('/update/:id', todoController.update);
router.post('/delete/:id', todoController.delete);

module.exports = router;
