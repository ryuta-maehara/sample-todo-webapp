const TodoService = require('../services/TodoService');
const fs = require('fs');
const path = require('path');

// テスト用DBファイルを都度作成・削除
const testDbPath = path.resolve(process.cwd(), 'data/todo_test.db');

beforeEach(done => {
    // テストDBをリセット
    if (global.service && global.service.db) {
        global.service.db.close(() => {
            if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);
            done();
        });
    } else {
        if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);
        done();
    }
});

describe('TodoService', () => {
    let service;
    beforeEach(() => {
        service = new TodoService();
        service.db = new service.db.constructor(testDbPath);
        service.db.serialize(() => {
            service.db.run(`CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT,
                due_date TEXT,
                priority INTEGER
            )`);
        });
        global.service = service;
    });

    afterAll(done => {
        if (service && service.db) {
            service.db.close(() => {
                if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);
                done();
            });
        } else {
            if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);
            done();
        }
    });

    test('createTodo & getAllTodos', done => {
        service.createTodo({ title: 't1', content: 'c1', due_date: '2026-02-08', priority: 3 }, err => {
            expect(err).toBeNull();
            service.getAllTodos('', 'asc', (err, todos) => {
                expect(err).toBeNull();
                expect(todos.length).toBe(1);
                expect(todos[0].title).toBe('t1');
                done();
            });
        });
    });

    test('updateTodo', done => {
        service.createTodo({ title: 't2', content: 'c2', due_date: '2026-02-09', priority: 2 }, err => {
            service.getAllTodos('', 'asc', (err, todos) => {
                const id = todos[0].id;
                service.updateTodo(id, { title: 't2u', content: 'c2u', due_date: '2026-02-10', priority: 1 }, err => {
                    expect(err).toBeNull();
                    service.getTodoById(id, (err, todo) => {
                        expect(todo.title).toBe('t2u');
                        done();
                    });
                });
            });
        });
    });

    test('deleteTodo', done => {
        service.createTodo({ title: 't3', content: 'c3', due_date: '2026-02-11', priority: 5 }, err => {
            service.getAllTodos('', 'asc', (err, todos) => {
                const id = todos[0].id;
                service.deleteTodo(id, err => {
                    expect(err).toBeNull();
                    service.getAllTodos('', 'asc', (err, todos2) => {
                        expect(todos2.length).toBe(0);
                        done();
                    });
                });
            });
        });
    });
});
