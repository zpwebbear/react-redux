import { componentStateHookFactory } from "app/component-state/componentStateHookFactory";
import { useTaskListHeaderOnTaskListPage } from "./taskListPageHeaderComponentState";

const hooks = {
  taskListPage: useTaskListHeaderOnTaskListPage,
};

const useTaskListPageHeaderComponentState = componentStateHookFactory(hooks, [
  "taskListPage",
]);

export const TaskListPageHeaderComponent = (props) => {
  const {
    taskListTitle,
    redirectHandler,
  } = useTaskListPageHeaderComponentState(props);

  return (
    <header className="flex justify-between py-5 border-b-2 border-pink-800">
      <h2 className="text-purple-900 font-bold py-5 text-lg">
        Task List: {taskListTitle}
      </h2>
      <button
        className="flex-shrink-0 ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
        onClick={redirectHandler}
      >
        Back to the Home Page
      </button>
    </header>
  );
};
