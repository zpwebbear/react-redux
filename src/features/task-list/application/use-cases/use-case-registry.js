import { useTaskCreateInTaskListCase } from "./useTaskCreateInTaskListCase";
import { useTaskCreateInTaskListCreateDialogCase } from "./useTaskCreateInTaskListCreateDialogCase";
import { useTaskListCloseCreateDialog } from "./useTaskListCloseCreateDialog";
import { useTaskListCreateDialogCase } from "./useTaskListCreateDialogCase";

const registry = [
  ["taskCreateInTaskList", useTaskCreateInTaskListCase],
  ["taskCreateInTaskListCreateDialog", useTaskCreateInTaskListCreateDialogCase],
  ["taskListCloseCreateDialog", useTaskListCloseCreateDialog],
  ["taskListCreateDialog", useTaskListCreateDialogCase],
];

export default registry;
