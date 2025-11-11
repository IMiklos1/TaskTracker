import { Request, Response, Router } from "express";
import db from "../lib/db";
import { Task, ITask } from "../models/task.model";

export class TaskController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    // Helper to map DB row to ITask
    mapRowToTask(row: any): ITask {
        return {
            id: row.id,
            title: row.title,
            description: row.description ?? undefined,
            completed: !!row.completed,
            dueDate: new Date(row.due_date),
            createdAt: new Date(row.created_at),
            updatedAt: new Date(row.updated_at),
        };
    }

    // Create Task
    createTask = (req: Request, res: Response) => {
        const { title, description, dueDate } = req.body;
        if (!title) return res.status(400).json({ error: "Title is required" });

        const task = new Task(title, description, new Date(dueDate));

        db.prepare(`
        INSERT INTO tasks (id, title, description, completed, due_date, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(
            task.id,
            task.title,
            task.description ?? null,
            task.completed ? 1 : 0,
            task.dueDate ? task.dueDate.toISOString() : null,
            task.createdAt.toISOString(),
            task.updatedAt.toISOString()
        );

        res.status(201).json(task);
    };

    // Get All Tasks
    getTasks = (_req: Request, res: Response) => {
        const rows = db.prepare("SELECT * FROM tasks").all();
        const tasks = rows.map(this.mapRowToTask);
        res.json(tasks);
    };

    // Get Task by ID
    getTaskById = (req: Request, res: Response) => {
        const { id } = req.params;
        const row = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
        if (!row) return res.status(404).json({ error: "Task not found" });
        res.json(this.mapRowToTask(row));
    };

    // Update Task
    updateTask = (req: Request, res: Response) => {
        const { id } = req.params;
        const row = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
        if (!row) return res.status(404).json({ error: "Task not found" });

        const task = this.mapRowToTask(row);
        const updateData: Partial<Omit<ITask, "id" | "createdAt">> = req.body;
        // Use Task class to update
        const taskInstance = Object.assign(new Task(task.title, task.description ?? "", task.dueDate!), task);
        taskInstance.update(updateData);

        db.prepare(`
        UPDATE tasks SET
        title = ?,
            description = ?,
            completed = ?,
            due_date = ?,
            updated_at = ?
            WHERE id = ?
            `).run(
            taskInstance.title,
            taskInstance.description ?? null,
            taskInstance.completed ? 1 : 0,
            taskInstance.dueDate ? taskInstance.dueDate.toISOString() : null,
            taskInstance.updatedAt.toISOString(),
            id
        );

        res.json(taskInstance);
    };

    // Delete Task
    deleteTask = (req: Request, res: Response) => {
        const { id } = req.params;
        const info = db.prepare("DELETE FROM tasks WHERE id = ?").run(id);
        if (info.changes === 0) return res.status(404).json({ error: "Task not found" });
        res.status(204).send();
    };

    // Register routes
    private routes() {
        this.router.post("/", this.createTask);
        this.router.get("/", this.getTasks);
        this.router.get("/:id", this.getTaskById);
        this.router.put("/:id", this.updateTask);
        this.router.delete("/:id", this.deleteTask);
    }
}