import { queryHookFactory } from "lib/react-query/queryHookFactory";
import { taskListAPI } from "../http/TaskListAPI";

export const useTaskListCreate = queryHookFactory(taskListAPI, "create");
