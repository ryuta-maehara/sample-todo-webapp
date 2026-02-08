const TodoService = require('../services/TodoService');

class TodoController {
    constructor() {
        this.service = new TodoService();
        this.list = this.list.bind(this);
        this.new = this.new.bind(this);
        this.create = this.create.bind(this);
        this.edit = this.edit.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }



    new(req, res) {
        res.render('new');
    }

    create(req, res) {
        const { title, content, due_date, priority } = req.body;
        this.service.createTodo({ title, content, due_date, priority }, err => {
            if (err) return res.status(500).send('DB Error');
            res.redirect('/');
        });
    }

    list(req, res) {
        const priority = req.query.priority || '';
        const sort = req.query.sort || 'asc';
        this.service.getAllTodos(priority, sort, (err, rows) => {
            if (err) return res.status(500).send('DB Error');
            res.render('index', { todos: rows, priority: priority, sort: sort });
        });
    }

    update(req, res) {
        const id = req.params.id;
        const { title, content, due_date, priority } = req.body;
        this.service.updateTodo(id, { title, content, due_date, priority }, err => {
            if (err) return res.status(500).send('DB Error');
            res.redirect('/');
        });
    }

    edit(req, res) {
        const id = req.params.id;
        this.service.getTodoById(id, (err, row) => {
            if (err || !row) return res.status(404).send('Not Found');
            res.render('edit', { todo: row });
        });
    }

    delete(req, res) {
        const id = req.params.id;
        this.service.deleteTodo(id, err => {
            if (err) return res.status(500).send('DB Error');
            res.redirect('/');
        });
    }
}

module.exports = TodoController;
