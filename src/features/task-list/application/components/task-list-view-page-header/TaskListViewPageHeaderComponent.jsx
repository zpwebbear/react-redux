import { componentStateHookFactory } from "app/component-state/componentStateHookFactory";
import { useOnTaskListViewPage } from "./taskListViewPageHeaderState";

const hooks = {
  taskListViewPage: useOnTaskListViewPage,
};

const useTaskListViewPageHeaderState = componentStateHookFactory(hooks, [
  "taskListViewPage",
]);

export const TaskListViewPageHeaderComponent = (props) => {
  const { showTaskListCreateDialogHandler } = useTaskListViewPageHeaderState(
    props
  );

  return (
    <header className="flex justify-between py-5 border-b-2 border-pink-800">
      <h2 className="text-purple-900 font-bold py-5 text-lg">Task Lists</h2>
      <button
        onClick={showTaskListCreateDialogHandler}
        className="transition-all duration-150 text-pink-500 bg-transparent border border-solid border-pink-500 hover:bg-pink-500 hover:text-white active:bg-pink-600 font-bold uppercase text-xs px-5 py-1 rounded outline-none focus:outline-none mx-1 mb-1"
        type="button"
      >
        Create Task List
      </button>
    </header>
  );
};
