"use client";

import { useContext } from "react";
import AddTask from "./addTask/addTask";
import styles from "./body.module.css";
import { TasksContext } from "@/store/tasks";
import { StatusContext } from "@/store/editing";

export default function BodyTasks() {
  const { setEditing } = useContext(StatusContext);
  const { tasks, setTasks } = useContext(TasksContext);

  function handleEdit(id: string) {
    const currentTask = tasks.filter((task) => task.id === id);
    setEditing({
      editing: true,
      taskName: currentTask[0].name,
      taskDate: currentTask[0].deadline,
      taskId: currentTask[0].id,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id: string) {
    const newTasksArray = tasks.filter((task) => task.id !== id);

    setTasks(newTasksArray);
  }

  function handleComplete(id: string) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "done" ? "in-progress" : "done" }
          : task
      )
    );
    console.log(tasks);
  }

  return (
    <section className={styles.bodyContainer}>
      <AddTask />
      <div className={styles.tasksContainer}>
        {[...tasks]
          .sort((a, b) => {
            const order: Record<string, number> = { "in-progress": 0, done: 1 };

            const aOrder = order[a.status || "done"];
            const bOrder = order[b.status || "done"];

            return aOrder - bOrder;
          })
          .map((task) => (
            <li
              key={task.id}
              className={`${styles.task} ${
                task.status === "done" ? styles.done : undefined
              }`}
            >
              <div className={styles.nameDate}>
                <p className={styles.taskName}>{task.name}</p>
                <p>{task.deadline}</p>
                <p>{task.status}</p>
              </div>
              <div className={styles.btns}>
                <button onClick={() => handleEdit(task.id)}>&#9998;</button>
                <button onClick={() => handleDelete(task.id)}>&#10008; </button>
                <button onClick={() => handleComplete(task.id)}>
                  &#10004;
                </button>
              </div>
            </li>
          ))}
      </div>
    </section>
  );
}

// last shit left add button clicks fo done and edit
// make this app responsive
// after make budgeting and weather app
