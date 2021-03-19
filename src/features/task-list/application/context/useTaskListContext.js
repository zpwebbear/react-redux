import { useContext } from "react";
import { TaskListContext } from "./TaskListProvider";

export function useTaskListContext() {
  const taskListContext = useContext(TaskListContext);

  return taskListContext;
}
