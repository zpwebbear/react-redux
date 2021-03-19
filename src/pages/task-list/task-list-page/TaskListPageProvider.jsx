import { useTaskListGetById } from "features/task-list/application/use-cases/useTaskListGetById";
import { TaskListPage } from "./TaskListPage";

export const TaskListPageProvider = () => {
  const { data: taskList, error, isFetched } = useTaskListGetById();

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return <TaskListPage taskList={taskList} isFetched={isFetched} />;
};
