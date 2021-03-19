import { ApiFactory } from "api/api-factory/ApiFactory";
import { fetchAPI } from "api/fetch-api-service/FetchApi";

export const TaskRepository = ApiFactory({
  resourceUrl: "/tasks",
  transport: fetchAPI
});

export const taskRepository = new TaskRepository();
