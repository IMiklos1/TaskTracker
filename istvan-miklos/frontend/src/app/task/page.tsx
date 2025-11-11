"use client";

import { createTask, deleteTask, getTasks } from "@/services/task.service";
import { useEffect, useState } from "react";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    getTasks().then(setTasks).catch(console.error);
  }, []);

  const handleAdd = async () => {
    const task = await createTask({ title: newTask });
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Tasks</h1>
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New task title"
        className="border p-2 mr-2"
      />
      <button onClick={handleAdd} className="bg-blue-500 text-white px-3 py-2 rounded">
        Add
      </button>
      <ul className="mt-4">
        {tasks.map((t) => (
          <li key={t.id} className="flex justify-between border-b py-2">
            <span>{t.title}</span>
            <button onClick={() => handleDelete(t.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
