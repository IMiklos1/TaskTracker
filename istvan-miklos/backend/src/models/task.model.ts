export interface ITask {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    dueDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export class Task implements ITask {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    dueDate?: Date;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        title: string,
        description: string,
        dueDate: Date
    ) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.completed = false;
        this.dueDate = dueDate;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    markCompleted() {
        this.completed = true;
        this.updatedAt = new Date();
    }

    update(details: Partial<Omit<ITask, 'id' | 'createdAt'>>) {
        if (details.title !== undefined) this.title = details.title;
        if (details.description !== undefined) this.description = details.description;
        if (details.completed !== undefined) this.completed = details.completed;
        if (details.dueDate !== undefined) this.dueDate = details.dueDate;
        this.updatedAt = new Date();
    }
}