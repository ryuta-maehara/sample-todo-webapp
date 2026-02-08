const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class TodoController {
  constructor() {
    this.db = new sqlite3.Database(path.join(__dirname, '../../data/todo.db'));
    this.list = this.list.bind(this);
    this.new = this.new.bind(this);
    this.create = this.create.bind(this);
    this.edit = this.edit.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  list(req, res) {
    this.db.all('SELECT * FROM todos ORDER BY priority DESC, due_date ASC', (err, rows) => {
      if (err) return res.status(500).send('DB Error');
      res.render('index', { todos: rows });
    });
  }

  new(req, res) {
    res.render('new');
  }

  create(req, res) {
    const { title, content, due_date, priority } = req.body;
    this.db.run(
      'INSERT INTO todos (title, content, due_date, priority) VALUES (?, ?, ?, ?)',
      [title, content, due_date, priority],
      err => {
        if (err) return res.status(500).send('DB Error');
        res.redirect('/');
      }
    );
  }

  edit(req, res) {
    const id = req.params.id;
    this.db.get('SELECT * FROM todos WHERE id = ?', [id], (err, row) => {
      if (err || !row) return res.status(404).send('Not Found');
      res.render('edit', { todo: row });
    });
  }

  update(req, res) {
    const id = req.params.id;
    const { title, content, due_date, priority } = req.body;
    this.db.run(
      'UPDATE todos SET title=?, content=?, due_date=?, priority=? WHERE id=?',
      [title, content, due_date, priority, id],
      err => {
        if (err) return res.status(500).send('DB Error');
        res.redirect('/');
      }
    );
  }

  delete(req, res) {
    const id = req.params.id;
    this.db.run('DELETE FROM todos WHERE id=?', [id], err => {
      if (err) return res.status(500).send('DB Error');
      res.redirect('/');
    });
  }
}

module.exports = TodoController;
