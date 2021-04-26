import { reactQueryMutationFactory, reactQueryQueryFactory } from "lib/react-query/queryHookFactory";
import { taskAPI } from "../http/TaskAPI";

export const useTaskCreate = reactQueryMutationFactory(taskAPI, "createTaskInTaskList");
export const useTaskGetById = reactQueryQueryFactory(taskAPI, "getById");
export const useTaskUpdateById = reactQueryMutationFactory(taskAPI, "replace");
