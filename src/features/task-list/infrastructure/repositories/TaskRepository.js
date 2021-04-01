import { ApiFactory } from "lib/api/api-factory/ApiFactory";
import { fetchAPI } from "lib/api/fetch-api-service/FetchApi";

export const TaskRepository = ApiFactory({
  resourceUrl: "/tasks",
  transport: fetchAPI,
});

TaskRepository.prototype.createTaskInTaskList = function (taskListId, body) {
  return this._transport.post(`${this._resourceUrl}?taskListId=${taskListId}`, {
    body,
  });
};

export const taskRepository = new TaskRepository();
