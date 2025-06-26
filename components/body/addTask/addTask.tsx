"use client";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./addTask.module.css";
import { TasksContext } from "@/store/tasks";
import { StatusContext } from "@/store/editing";

export default function AddTask() {
  const { editing, setEditing } = useContext(StatusContext);
  const [error, setError] = useState<string | null>(null);
  const { tasks, setTasks } = useContext(TasksContext);
  const dateRef = useRef<HTMLInputElement>(null);

  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const taskRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing.editing) {
      setTaskName(editing.taskName);
      setTaskDate(editing.taskDate);
    } else {
      setTaskName("");
      setTaskDate("");
    }
  }, [editing]);

  function handleClick() {
    const deadLine = dateRef.current?.value;
    const taskName = taskRef.current?.value;

    if (!taskName || !deadLine) {
      setError("Both Fields Must be filled");
      return;
    }
    const newTask = {
      name: taskName,
      deadline: deadLine,
      id: crypto.randomUUID(),
      status: "in-progress",
    };

    setTasks([newTask, ...tasks]);
    taskRef.current!.value = "";
    dateRef.current!.value = "";
    setTaskName("");
    setTaskDate("");

    setError(null);
  }

  function handleCancel() {
    setTaskName("");
    setTaskDate("");
    setEditing({ editing: false, taskDate: "", taskName: "", taskId: "" });

    setError(null);
  }

  function handleSave() {
    if (!taskName || !taskDate) {
      setError("Both Fields Must be filled");
      return;
    }

    const updatedTasks = tasks.map((task) =>
      task.id === editing.taskId
        ? { ...task, name: taskName, deadline: taskDate }
        : task
    );
    setError(null);

    setTasks(updatedTasks);

    handleCancel();
  }

  return (
    <div className={styles.addTaskContainer}>
      <input
        type="text"
        placeholder="Enter Task"
        value={taskName}
        ref={taskRef}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <input
        type="date"
        ref={dateRef}
        value={taskDate}
        className={styles.date}
        onChange={(e) => setTaskDate(e.target.value)}
      />
      {editing.editing ? (
        <div className={styles.btnContainer}>
          <button className={styles.btn} onClick={handleCancel}>
            Cancel
          </button>
          <button className={styles.btn} onClick={handleSave}>
            Save
          </button>
        </div>
      ) : (
        <button className={styles.btn} onClick={handleClick}>
          Add New Task
        </button>
      )}

      {error === null ? undefined : <p className={styles.error}>{error}</p>}
    </div>
  );
}
