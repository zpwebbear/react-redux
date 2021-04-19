import { queryHookFactory } from "lib/react-query/queryHookFactory";
import { taskAPI } from "../http/TaskAPI";

export const useTaskCreate = queryHookFactory(taskAPI, "createTaskInTaskList");
