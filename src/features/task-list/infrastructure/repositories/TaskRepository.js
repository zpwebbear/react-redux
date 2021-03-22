import { ApiFactory } from "lib/api/api-factory/ApiFactory";
import { fetchAPI } from "lib/api/fetch-api-service/FetchApi";

export const TaskRepository = ApiFactory({
  resourceUrl: "/tasks",
  transport: fetchAPI
});

export const taskRepository = new TaskRepository();
