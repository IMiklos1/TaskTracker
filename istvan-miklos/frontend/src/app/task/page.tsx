"use client";

import { useEffect, useState } from "react";
import { createTask, deleteTask, getTasks, updateTask } from "@/services/task.service";
import { ITask } from "@/models/task.model";

export default function TasksPage() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "" });
  const [loading, setLoading] = useState(false);

  // Load tasks
  useEffect(() => {
    (async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        console.error("Failed to load tasks", err);
      }
    })();
  }, []);

  // Create new task
  const handleAdd = async () => {
    if (!newTask.title.trim()) return alert("Title required");
    setLoading(true);
    try {
      const created = await createTask(newTask);
      setTasks([...tasks, created]);
      setNewTask({ title: "", description: "", dueDate: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Toggle complete
  const handleToggle = async (task: ITask) => {
    try {
      const updated = await updateTask(task.id, { completed: !task.completed });
      setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
    } catch (err) {
      console.error(err);
    }
  };

  // Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📝 Task Tracker</h1>

      {/* Add New Task */}
      <div className="bg-gray-50 p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-3">Add New Task</h2>
        <div className="grid md:grid-cols-3 gap-2">
          <input
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="Title"
            className="border rounded p-2 w-full"
          />
          <input
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            placeholder="Description"
            className="border rounded p-2 w-full"
          />
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            className="border rounded p-2 w-full"
          />
        </div>
        <button
          onClick={handleAdd}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-3 hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-2">
        {tasks.length === 0 && (
          <p className="text-gray-500 text-center">No tasks yet. Add one above!</p>
        )}
        {tasks.map((t) => (
          <li
            key={t.id}
            className="flex justify-between items-center bg-white p-3 border rounded shadow-sm hover:shadow-md transition"
          >
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center">
                <span
                  className={`font-medium text-lg ${
                    t.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {t.title}
                </span>
                <span className="text-sm text-gray-500">
                  {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "No due date"}
                </span>
              </div>
              {t.description && <p className="text-gray-600 text-sm">{t.description}</p>}
            </div>

            <div className="flex gap-2 ml-4">
              <button
                onClick={() => handleToggle(t)}
                className={`px-3 py-1 rounded text-sm ${
                  t.completed
                    ? "bg-yellow-500 text-white hover:bg-yellow-600"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {t.completed ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
