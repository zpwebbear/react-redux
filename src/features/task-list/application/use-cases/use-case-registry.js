import { useTaskCreateInTaskListCase } from "./useTaskCreateInTaskListCase";
import { useTaskListCreateDialogCase } from "./useTaskListCreateDialogCase";
import { useTaskSelectAndUpdateByIdCase } from "./useTaskSelectAndUpdateByIdCase";

const registry = {
  "task/create/in-task-list": useTaskCreateInTaskListCase,
  "task-list/create/dialog": useTaskListCreateDialogCase,
  "task/select-and-update/api": useTaskSelectAndUpdateByIdCase,
};

export default registry;
