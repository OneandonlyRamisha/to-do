"use client";

import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type EditingStatus = {
  editing: boolean;
  taskName: string;
  taskDate: string;
  taskId: string;
};

// Define the context type
type EditingContextType = {
  editing: EditingStatus;
  setEditing: Dispatch<SetStateAction<EditingStatus>>;
};
const defaultEditing: EditingStatus = {
  editing: false,
  taskName: "",
  taskDate: "",
  taskId: "",
};
const StatusContext = createContext<EditingContextType>({
  editing: defaultEditing,
  setEditing: () => {},
});

// Provider component
const StatusProvider = ({ children }: { children: ReactNode }) => {
  const [editing, setEditing] = useState<EditingStatus>(defaultEditing);

  return (
    <StatusContext.Provider value={{ editing, setEditing }}>
      {children}
    </StatusContext.Provider>
  );
};

export { StatusContext, StatusProvider };
