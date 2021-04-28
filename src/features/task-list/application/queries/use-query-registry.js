import { useTaskListIdsQuery } from "./useTaskListIdsQuery";
import { useTaskListTitleQuery } from "./useTaskListTitleQuery";

const registry = {
  "task-list/get/ids": useTaskListIdsQuery,
  "task-list/get/title": useTaskListTitleQuery,
};

export default registry;
