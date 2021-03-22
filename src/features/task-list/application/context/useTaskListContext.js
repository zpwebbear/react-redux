import { useContext } from "react";
import { TaskListContext } from "./TaskListContextProvider";

export function useTaskListContext() {
  const taskListContext = useContext(TaskListContext);

  return taskListContext;
}
