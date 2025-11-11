
import path from "path";
import Database from "better-sqlite3";

const dbPath = path.resolve(process.cwd(), "data", "app.db");
const db: typeof Database.prototype = new Database(dbPath);

// Initialize a sample table if it doesn’t exist
db.prepare(`
CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    completed INTEGER NOT NULL DEFAULT 0,
    due_date DATETIME,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`).run();

export default db;
