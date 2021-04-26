import { useCase } from "app/container/appContainer";
import { useCallback } from "react";

export const useOnTaskListViewPage = () => {
  const { dispatch } = useCase("task-list/create-dialog");

  const showTaskListCreateDialogHandler = useCallback(() => {
    dispatch({ type: "task-list/create-dialog/show" });
  }, [dispatch]);

  return {
    showTaskListCreateDialogHandler,
  };
};
