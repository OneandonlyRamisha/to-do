"use client";

import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type Task = {
  id: string;
  name: string;
  deadline: string;
  status?: string;
};

type TasksContextType = {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

const TasksContext = createContext<TasksContextType>({
  tasks: [],
  setTasks: () => {}, // temporary empty function
});

const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

export { TasksContext, TasksProvider };
