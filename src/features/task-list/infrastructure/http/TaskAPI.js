//@ts-check
import { ApiFactory } from "lib/api/api-factory/ApiFactory";
import { fetchAPI } from "lib/api/fetch-api-service/FetchApi";

export const TaskAPI = ApiFactory({
  resourceUrl: "/tasks",
  transport: fetchAPI,
});

/**
 *
 * @param {*} props
 * @returns
 */
TaskAPI.prototype.createTaskInTaskList = function ({ taskListId, task }) {
  return this._transport.post(`${this._resourceUrl}?taskListId=${taskListId}`, {
    body: task,
  });
};

export const taskAPI = new TaskAPI();
