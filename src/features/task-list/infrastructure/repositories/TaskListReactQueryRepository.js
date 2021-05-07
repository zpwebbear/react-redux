import {
  reactQueryMutationFactory,
  reactQueryQueryFactory,
} from "lib/react-query/queryHookFactory";
import { taskListAPI } from "../http/TaskListAPI";

export const useTaskListCreate = reactQueryMutationFactory(
  taskListAPI,
  "create"
);
export const useTaskListGetAll = reactQueryQueryFactory(taskListAPI, "getAll");
export const useTaskListGetAllIds = reactQueryQueryFactory(
  taskListAPI,
  "getAll",
  {
    select: (data) => {
      return data.map((taskList) => taskList.id);
    },
  }
);
export const useTaskIdsByTaskListId = reactQueryQueryFactory(
  taskListAPI,
  "getById",
  {
    select: (data) => data.tasks.map((task) => task.id),
  }
);

export const useTaskListGetById = reactQueryQueryFactory(
  taskListAPI,
  "getById",
)
