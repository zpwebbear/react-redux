import { createHookEntity } from "app/container/utils/createHookEntity";
import { useCaseFactory } from "app/container/utils/useCaseFactory";
import { useDialogContext } from "app/dialog/application/context/useDialogContext";
import { createTaskListDialogToken } from "features/task-list/domain/constants";
import { useCallback, useMemo, useRef } from "react";
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

  const events = useRef(new Map());
  const subscribable = useMemo(() => new Map(), []);
  const dispatchable = useMemo(
    () =>
      createHookEntity({
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
      }),
    [dialogRegisterHandler, dialogUnregisterHandler, showTaskListCreateDialog]
  );

  return useCaseFactory({ dispatchable, subscribable, events });
}
