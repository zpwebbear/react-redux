import { useTaskListShowCreateDialogCase } from "../use-cases/useTaskListShowCreateDialogCase";
import { useTaskCreateInTaskListCreateDialogCommand } from "./useTaskCreateInTaskListCreateDialogCase";

const taskListCommandRegistry = {
  "task/create/in-task-list-create-dialog": useTaskCreateInTaskListCreateDialogCommand,
  "task-list/create-dialog": useTaskListShowCreateDialogCase,
};

export default taskListCommandRegistry;
