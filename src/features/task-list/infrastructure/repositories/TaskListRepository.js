import { ApiFactory } from "lib/api/api-factory/ApiFactory";
import { fetchAPI } from "lib/api/fetch-api-service/FetchApi";

export const TaskListRepository = ApiFactory({
  // resourceUrl: "/tasks-lists",
  resourceUrl: "/task-lists",
  transport: fetchAPI
});

/**
 * This function is only the example of ability how to add new methods 
 * to the generated API classes
 */
TaskListRepository.prototype.dummyCount = async function () {
    const result = await this._transport.get();

    return result;
};

export const taskListRepository = new TaskListRepository();