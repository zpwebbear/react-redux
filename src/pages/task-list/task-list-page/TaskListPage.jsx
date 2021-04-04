import { useRedirect } from "features/shared/application/useRedirect";
import { TaskCreateItem } from "features/task-list/application/components/task-create-item/TaskCreateItem";
import { useTaskListGetById } from "features/task-list/application/use-cases/useTaskListGetById";
import { useTaskListUpdateTask } from "features/task-list/application/use-cases/useTaskListUpdateTask";
import { useTaskCreateProvider } from "features/task-list/infrastructure/providers/TaskCreateProvider";
import PropTypes from "prop-types";
import { useCallback, useEffect } from "react";
import { useProviderRegister } from "../../../app/provider-container/ProviderContainer";
import { TaskItem } from "../components/task-item/TaskItem";

const useTaskListPageState = () => {
  const { redirectTo } = useRedirect();
  const { mutate } = useTaskListUpdateTask();

  const { register, unregister } = useProviderRegister();

  useEffect(() => {
    register("taskCreateProvider", useTaskCreateProvider);
    return () => unregister("taskCreateProvider");
  }, [register, unregister]);

  const { data: taskList, error, isFetched } = useTaskListGetById();
  const onCheckHandler = useCallback(
    (taskItem) => {
      mutate({ ...taskItem, completed: !taskItem.completed });
    },
    [mutate]
  );
  return { redirectTo, onCheckHandler, taskList, error, isFetched };
};

export const TaskListPage = () => {
  const {
    redirectTo,
    onCheckHandler,
    taskList,
    error,
    isFetched,
  } = useTaskListPageState();

  if (error) {
    return <h1>{error.message}</h1>;
  }
  return (
    <div>
      <header className="flex justify-between py-5 border-b-2 border-pink-800">
        <h2 className="text-purple-900 font-bold py-5 text-lg">
          Task List: {taskList?.title}
        </h2>
        <button
          className="transition-all duration-150 text-pink-500 bg-transparent border border-solid border-pink-500 hover:bg-pink-500 hover:text-white active:bg-pink-600 font-bold uppercase text-xs px-5 py-1 rounded outline-none focus:outline-none mx-1 mb-1"
          onClick={redirectTo("/")}
        >
          Back to the Home Page
        </button>
      </header>
      <ul className="py-2">
        {isFetched &&
          taskList.tasks &&
          taskList.tasks.map((task) => (
            <TaskItem key={task.id} taskItem={task} onCheck={onCheckHandler} />
          ))}
        <li>
          <TaskCreateItem provider="taskCreateProvider" />
        </li>
      </ul>
    </div>
  );
};

TaskListPage.propTypes = {
  taskList: PropTypes.shape({
    title: PropTypes.string,
    tasks: PropTypes.array,
  }),
  isFetched: PropTypes.bool,
};
