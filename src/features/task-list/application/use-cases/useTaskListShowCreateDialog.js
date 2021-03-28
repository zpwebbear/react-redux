import { useDialogContext } from "features/dialog/application/context/useDialogContext";
import { createTaskListDialogToken } from "features/task-list/domain/constants";
import { useEffect } from "react";
import { TaskListCreateDialog } from "../components/TaskListCreateDialog";

export function useTaskListShowCreateDialog() {
  const {
    dialogOpenHandler,
    dialogRegisterHandler,
    dialogUnregisterHandler,
  } = useDialogContext();

  useEffect(() => {
    dialogRegisterHandler(createTaskListDialogToken, TaskListCreateDialog);
    
    return () => dialogUnregisterHandler(createTaskListDialogToken);
  }, [dialogRegisterHandler, dialogUnregisterHandler]);

  return {
    showTaskListCreateDialog: () => {
      dialogOpenHandler(createTaskListDialogToken);
    },
  };
}
