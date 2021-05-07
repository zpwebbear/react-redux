import { useTaskCreateInTaskListCase } from "./useTaskCreateInTaskListCase";
import { useTaskListCreateDialogCase } from "./useTaskListCreateDialogCase";

const registry = {
  "task/create/in-task-list": useTaskCreateInTaskListCase,
  "task-list/create/dialog": useTaskListCreateDialogCase,
};

export default registry;
