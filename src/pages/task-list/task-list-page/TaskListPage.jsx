import { useRedirect } from "features/shared/application/useRedirect";
import { TaskItemCreateAndEdit } from "features/task-list/application/components/task-item/create-adn-edit/TaskItemCreateAndEdit";
import { TaskItem } from "features/task-list/application/components/task-item/item/TaskItem";
import { TaskItemList } from "features/task-list/application/components/task-item/list/TaskItemList";
import { useTaskListGetById } from "features/task-list/application/use-cases/useTaskListGetById";
import { Suspense } from "react";

const useTaskListPageState = () => {
  const { redirectTo } = useRedirect();
  const { data: taskList } = useTaskListGetById(null, {
    select: (t) => ({ title: t.title }),
  });

  return {
    redirectTo,
    taskList,
  };
};

export const TaskListPage = () => {
  const { redirectTo, taskList } = useTaskListPageState();

  return (
    <div>
      <header className="flex justify-between py-5 border-b-2 border-pink-800">
        <h2 className="text-purple-900 font-bold py-5 text-lg">
          Task List: {taskList?.title}
        </h2>
        <button
          className="flex-shrink-0 ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
          onClick={redirectTo("/")}
        >
          Back to the Home Page
        </button>
      </header>

      <Suspense fallback={<div>Task List Loading...</div>}>
        <TaskItemList newTaskItem={<TaskItemCreateAndEdit />}>
          <TaskItem />
        </TaskItemList>
      </Suspense>
    </div>
  );
};
