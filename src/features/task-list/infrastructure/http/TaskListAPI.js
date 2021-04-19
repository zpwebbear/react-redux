import { ApiFactory } from "lib/api/api-factory/ApiFactory";
import { fetchAPI } from "lib/api/fetch-api-service/FetchApi";

export const TaskListAPI = ApiFactory({
  resourceUrl: "/task-lists",
  transport: fetchAPI
});

export const taskListAPI = new TaskListAPI();