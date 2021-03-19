import React from "react";
import { TaskListRepository } from "../../infrastructure/repositories/TaskListRepository";
import { TaskRepository } from "../../infrastructure/repositories/TaskRepository";

export const TaskListContext = React.createContext({});

export function TaskListProvider({ children }) {
  const taskListRepository = new TaskListRepository();
  const taskRepository = new TaskRepository();

  return (
    <TaskListContext.Provider
      value={{
        taskListRepository,
        taskRepository,
      }}
    >
      {children}
    </TaskListContext.Provider>
  );
}
