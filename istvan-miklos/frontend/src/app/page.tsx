import Image from "next/image";
import TasksPage from "./task/page";

export default function Home() {
  const Task = TasksPage;
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="mb-8 text-5xl font-extrabold leading-tight text-gray-900 dark:text-white sm:text-6xl">
          TaskTracker
        </h1>
        <Task />
      </main>
    </div>
  );
}
