import { useDialogContext } from "features/dialog/application/context/useDialogContext";
import { useEffect } from "react";
import { TaskListCreateDialog } from "../components/TaskListCreateDialog";

export function useTaskListShowCreateDialog() {
  const {
    dialogOpenHandler,
    dialogRegisterHandler,
    dialogUnregisterHandler,
  } = useDialogContext();

  useEffect(() => {
    dialogRegisterHandler("task-list/create", TaskListCreateDialog);
    
    return () => dialogUnregisterHandler("task-list/create");
  }, [dialogRegisterHandler, dialogUnregisterHandler]);

  return {
    showTaskListCreateDialog: () => {
      dialogOpenHandler("task-list/create");
    },
  };
}
