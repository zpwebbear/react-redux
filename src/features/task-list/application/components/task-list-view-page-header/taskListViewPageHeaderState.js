import { useAppCase } from "app/container/appContainer";
import { useCallback, useEffect } from "react";

export const useTaskListViewHeaderTaskListViewPage = () => {
  const { dispatch } = useAppCase("task-list/create-dialog");

  useEffect(() => {
    dispatch({ type: "task-list/create-dialog/register" });

    return () => dispatch({ type: "task-list/create-dialog/unregister" });
  }, [dispatch]);

  const showTaskListCreateDialogHandler = useCallback(() => {
    dispatch({ type: "task-list/create-dialog/show" });
  }, [dispatch]);

  return {
    showTaskListCreateDialogHandler,
  };
};
