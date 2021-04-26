import { componentStateHookFactory } from "app/component-state/componentStateHookFactory";
import { useTaskListCardOnTaskListPage } from "./taskListCardComponentState";

const hooks = {
  taskListViewPage: useTaskListCardOnTaskListPage,
};

const useTaskListCardComponentState = componentStateHookFactory(hooks, [
  "taskListViewPage",
]);

export const TaskListCardComponent = (props) => {
  const { taskListTitle, cardClickHandler } = useTaskListCardComponentState(
    props
  );
  return (
    <div
      className="cursor-pointer"
      onClick={cardClickHandler}
      data-testid="task-list-card"
    >
      <h2>{taskListTitle}</h2>
    </div>
  );
};
