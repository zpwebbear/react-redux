import { componentStateHookFactory } from "app/component-state/componentStateHookFactory";
import React, { Suspense } from "react";
import { useTaskListCardListOnTaskListViewPage } from "./taskListCardListWidgetState";

const hooks = {
  taskListViewPage: useTaskListCardListOnTaskListViewPage,
};

const useTaskListCardListWidgetState = componentStateHookFactory(hooks, [
  "taskListViewPage",
]);

export const TaskListCardListWidget = (props) => {
  const {
    taskListIds,
    error,
    isFetched,
    children,
  } = useTaskListCardListWidgetState(props);

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div
      className="grid grid-cols-3 gap-4 my-3"
      data-testid="task-list-container"
    >
      {isFetched &&
        taskListIds.map(
          (id) =>
            id &&
            React.Children.only(children) && (
              <Suspense
                key={id}
                fallback={
                  <div>
                    <h2>Loading...</h2>
                  </div>
                }
              >
                <React.Fragment key={id}>
                  {React.cloneElement(children, { id })}
                </React.Fragment>
              </Suspense>
            )
        )}
      {isFetched && taskListIds.length === 0 && (
        <h3 className="text-purple-600">
          There no task lists yet. Please create at least one!
        </h3>
      )}
    </div>
  );
};
