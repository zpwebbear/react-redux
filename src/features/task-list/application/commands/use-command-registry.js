import { useTaskListShowCreateDialogCommand } from "./useTaskListShowCreateDialogCase";
import { useTaskUpdateByIdCommand } from "./useTaskUpdateByIdCommand";
import { useTaskCreateInTaskListCreateDialogCommand } from "./useTaskCreateInTaskListCreateDialogCase";
import { useTaskUpdateLocalStateCommand } from "./useTaskUpdateLocalStateCommand";

const taskListCommandRegistry = {
  "task/create/in-task-list-create-dialog": useTaskCreateInTaskListCreateDialogCommand,
  "task-list/create-dialog": useTaskListShowCreateDialogCommand,
  "task/update/task-list-page": useTaskUpdateByIdCommand,
  "task/update/at-task-list-create-dialog": useTaskUpdateLocalStateCommand
};

export default taskListCommandRegistry;
