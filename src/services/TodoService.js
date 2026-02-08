const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class TodoService {
    constructor() {
        this.db = new sqlite3.Database(path.resolve(process.cwd(), 'data/todo.db'));
        this.db.serialize(() => {
            this.db.run(`CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT,
                due_date TEXT,
                priority INTEGER
            )`);
        });
    }

    getAllTodos(priority, sort, callback) {
        let sql = 'SELECT * FROM todos';
        let params = [];
        if (priority !== '') {
            const numPriority = parseInt(priority, 10);
            if (!isNaN(numPriority)) {
                sql += ' WHERE priority = ?';
                params.push(numPriority);
            }
        }
        sql += ` ORDER BY date(due_date) ${sort === 'desc' ? 'DESC' : 'ASC'}, priority DESC`;
        this.db.all(sql, params, callback);
    }

    getTodoById(id, callback) {
        this.db.get('SELECT * FROM todos WHERE id = ?', [id], callback);
    }

    createTodo({ title, content, due_date, priority }, callback) {
        this.db.run(
            'INSERT INTO todos (title, content, due_date, priority) VALUES (?, ?, ?, ?)',
            [title, content, due_date, priority],
            callback
        );
    }

    updateTodo(id, { title, content, due_date, priority }, callback) {
        this.db.run(
            'UPDATE todos SET title=?, content=?, due_date=?, priority=? WHERE id=?',
            [title, content, due_date, priority, id],
            callback
        );
    }

    deleteTodo(id, callback) {
        this.db.run('DELETE FROM todos WHERE id=?', [id], callback);
    }
}

module.exports = TodoService;
