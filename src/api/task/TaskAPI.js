import { ApiFactory } from "../api-factory/ApiFactory";
import { fetchAPI } from "../fetch-api-service/FetchApi";

const TaskAPI = ApiFactory({
  resourceUrl: "/tasks",
  transport: fetchAPI
});

export const taskAPI = new TaskAPI();
