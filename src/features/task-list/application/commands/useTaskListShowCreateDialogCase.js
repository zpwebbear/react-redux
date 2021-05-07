import { useCaseFactory } from "app/container/utils/useCaseFactory";
import { useCreateDispatchable } from "app/container/utils/useCreateDispatchable";
import { useDialogContext } from "app/dialog/application/context/useDialogContext";
import { createTaskListDialogToken } from "features/task-list/domain/constants";
import { useCallback } from "react";
import { TaskListCreateDialogWidget } from "../widgets/task-list-create-dialog/TaskListCreateDialogWidget";

export const useTaskListShowCreateDialogCommand = () => {
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
        TaskListCreateDialogWidget
      ),
      "task-list/create-dialog/unregister": dialogUnregisterHandler.bind(
        null,
        createTaskListDialogToken
      ),
    },
    [dialogRegisterHandler, dialogUnregisterHandler, showTaskListCreateDialog]
  );

  return useCaseFactory({ dispatchable });
};
