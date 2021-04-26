import { useTaskListIdsQuery } from "./useTaskListIdsQuery";

const registry = {
  "task-list/get/ids": useTaskListIdsQuery,
};

export default Object.entries(registry);
