import { useCallback } from "react";
import { useTaskListShowCreateDialog } from "../../use-cases/useTaskListShowCreateDialog";

export const useOnTaskListViewPage = (props) => {
  const { showTaskListCreateDialog } = useTaskListShowCreateDialog();

  const showTaskListCreateDialogHandler = useCallback(() => {
    showTaskListCreateDialog();
  }, [showTaskListCreateDialog]);

  return {
    showTaskListCreateDialogHandler,
  };
};
