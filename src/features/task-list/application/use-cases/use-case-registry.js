import { useTaskCreateInTaskListCase } from "./useTaskCreateInTaskListCase";
import { useTaskCreateInTaskListCreateDialogCase } from "./useTaskCreateInTaskListCreateDialogCase";
import { useTaskListCreateDialogCase } from "./useTaskListCreateDialogCase";
import { useTaskListShowCreateDialogCase } from "./useTaskListShowCreateDialogCase";
import { useTaskSelectAndUpdateByIdCase } from "./useTaskSelectAndUpdateByIdCase";

const registry = [
  ["task/create/in-task-list", useTaskCreateInTaskListCase],
  ["task/create/in-task-list-create-dialog", useTaskCreateInTaskListCreateDialogCase],
  ["task-list/create/dialog", useTaskListCreateDialogCase],
  ["task/select-and-update/api", useTaskSelectAndUpdateByIdCase],
  ["task-list/create-dialog", useTaskListShowCreateDialogCase],
];

export default registry;
