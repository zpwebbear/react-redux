import { useTaskListService } from "features/task-list/application/useTaskListService";
import { taskListRepository } from "features/task-list/infrastructure/repositories/TaskListRepository";
import { taskRepository } from "features/task-list/infrastructure/repositories/TaskRepository";
import { TaskListPage } from "./TaskListPage";

export const TaskListPageProvider = () => {
  const { useTaskListGetById } = useTaskListService({
    taskListAPI: taskListRepository,
    taskAPI: taskRepository,
  });
  const { data: taskList, error, isFetched } = useTaskListGetById();

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return <TaskListPage taskList={taskList} isFetched={isFetched} />;
};
