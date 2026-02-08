const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

class TodoService {
    constructor() {
        const dbDir = path.resolve(process.cwd(), 'data');
        // Ensure the data directory exists before opening the database
        fs.mkdirSync(dbDir, { recursive: true });
        const dbPath = path.join(dbDir, 'todo.db');

        this.db = new sqlite3.Database(dbPath);
        this.db.serialize(() => {
            const schema = `CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT,
                due_date TEXT,
                priority INTEGER
            )`;
            this.db.run(schema, (err) => {
                if (err) {
                    console.error('DB初期化エラー:', err);
                    process.exit(1);
                }
                // due_dateにインデックスを追加
                this.db.run('CREATE INDEX IF NOT EXISTS idx_due_date ON todos(due_date);');
            });
        });
    }

    getAllTodos(priority, sort, callback) {
        let sql = 'SELECT * FROM todos';
        const params = [];

        // priorityフィルタ
        if (priority !== '' && priority !== undefined && priority !== null) {
            sql += ' WHERE priority = ?';
            params.push(priority);
        }

        // 並び替え（due_dateをASC/DESCでソート）
        let orderDirection = 'ASC';
        if (typeof sort === 'string') {
            const upperSort = sort.toUpperCase();
            if (upperSort === 'ASC' || upperSort === 'DESC') {
                orderDirection = upperSort;
            }
        }
        sql += ' ORDER BY due_date ' + orderDirection;

        this.db.all(sql, params, (err, rows) => {
            if (typeof callback !== 'function') {
                // callbackがない場合は何もせず終了
                return;
            }
            if (err) {
                callback(err);
                return;
            }
            callback(null, rows);
        });
    }

    createTodo(todoData, callback) {
        const { title, content, dueDate, due_date, priority } = todoData;
        const normalizedDueDate = dueDate !== undefined ? dueDate : due_date;

        this.db.run(
            'INSERT INTO todos (title, content, due_date, priority) VALUES (?, ?, ?, ?)',
            [title, content, normalizedDueDate, priority],
            callback
        );
    }

    updateTodo(id, todoData, callback) {
        const { title, content, dueDate, due_date, priority } = todoData;
        const normalizedDueDate = dueDate !== undefined ? dueDate : due_date;

        this.db.run(
            'UPDATE todos SET title = ?, content = ?, due_date = ?, priority = ? WHERE id = ?',
            [title, content, normalizedDueDate, priority, id],
            callback
        );
    }

    deleteTodo(id, callback) {
        this.db.run('DELETE FROM todos WHERE id = ?', [id], callback);
    }

    getTodoById(id, callback) {
        this.db.get('SELECT * FROM todos WHERE id = ?', [id], (err, row) => {
            if (typeof callback !== 'function') {
                return;
            }
            if (err) {
                callback(err);
                return;
            }
            callback(null, row);
        });
    }
}

module.exports = TodoService;
