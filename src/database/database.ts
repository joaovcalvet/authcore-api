import { DatabaseSync } from 'node:sqlite';

const database: DatabaseSync = new DatabaseSync("database.sqlite");

// Criar tabale "users"
database.exec(`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );
`);