import React, { Suspense } from "react";
import {
  useTaskItemListInTaskListCreateDialog,
  useTaskItemListOnTaskListPage,
} from "./hookProviders";

const providers = {
  default: useTaskItemListOnTaskListPage,
  taskListCreateDialog: useTaskItemListInTaskListCreateDialog,
};

const useTaskItemListState = ({ provider = "default", ...rest }) => {
  const useProviderHook = providers[provider];

  return useProviderHook(rest);
};

export const TaskItemList = (props) => {
  const {
    children,
    newTaskItem: NewTaskItem,
    taskIds,
    error,
  } = useTaskItemListState(props);

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <ul className="py-2">
      {taskIds.map(
        (id) =>
          React.Children.only(children) && (
            <Suspense
              key={id}
              fallback={
                <li key={id} className="py-1">
                  Loading...
                </li>
              }
            >
              <React.Fragment key={id}>
                {React.cloneElement(children, { id })}
              </React.Fragment>
            </Suspense>
          )
      )}
      {React.isValidElement(NewTaskItem) && <li>{NewTaskItem}</li>}
    </ul>
  );
};
