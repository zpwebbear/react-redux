import { useTaskByIdForTaskListPageQuery } from "./useTaskByIdForTaskListPageQuery";
import { useTaskIdsHttpQuery } from "./useTaskIdsHttpQuery";
import { useTaskIdsLocalStateQuery } from "./useTaskIdsLocalStateQuery";
import { useTaskListIdsQuery } from "./useTaskListIdsQuery";
import { useTaskListTitleQuery } from "./useTaskListTitleQuery";
import { useTaskLocalStateQuery } from "./useTaskLocalStateQuery";

const registry = {
  "task-list/get/ids": useTaskListIdsQuery,
  "task-list/get/title": useTaskListTitleQuery,
  "task/get/at-task-list-page": useTaskByIdForTaskListPageQuery,
  "task/ids/task-list-page": useTaskIdsHttpQuery,
  "task/ids/task-create-dialog": useTaskIdsLocalStateQuery,
  "task/get/at-task-create-dialog": useTaskLocalStateQuery,
};

export default registry;
