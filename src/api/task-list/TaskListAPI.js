import { ApiFactory } from "../api-factory/ApiFactory";
import { fetchAPI } from "../fetch-api-service/FetchApi";

const TaskListAPI = ApiFactory({
  // resourceUrl: "/tasks-lists",
  resourceUrl: "/task-lists",
  transport: fetchAPI
});

/**
 * This function is only the example of ability how to add new methods 
 * to the generated API classes
 */
TaskListAPI.prototype.dummyCount = async function () {
    const result = await this._transport.get();

    console.log("RESULT", result);

    return result;
};

export const taskListAPI = new TaskListAPI();