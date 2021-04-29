import { useCaseFactory } from "app/container/utils/useCaseFactory";
import { useCreateDispatchable } from "app/container/utils/useCreateDispatchable";
import { useDialogContext } from "app/dialog/application/context/useDialogContext";
import { createTaskListDialogToken } from "features/task-list/domain/constants";
import { useCallback } from "react";
import { TaskListCreateDialog } from "../widgets/task-list-create-dialog/TaskListCreateDialogWidget";

export function useTaskListShowCreateDialogCase() {
  const {
    dialogOpenHandler,
    dialogRegisterHandler,
    dialogUnregisterHandler,
  } = useDialogContext();

  const showTaskListCreateDialog = useCallback(() => {
    dialogOpenHandler(createTaskListDialogToken);
  }, [dialogOpenHandler]);

  const dispatchable = useCreateDispatchable(
    {
      "task-list/create-dialog/show": showTaskListCreateDialog,
      "task-list/create-dialog/register": dialogRegisterHandler.bind(
        null,
        createTaskListDialogToken,
        TaskListCreateDialog
      ),
      "task-list/create-dialog/unregister": dialogUnregisterHandler.bind(
        null,
        createTaskListDialogToken
      ),
    },
    [dialogRegisterHandler, dialogUnregisterHandler, showTaskListCreateDialog]
  );

  return useCaseFactory({ dispatchable });
}
