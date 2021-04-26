import { useDialogContext } from "app/dialog/application/context/useDialogContext";
import { useCaseFactory } from "app/container/useCaseFactory";
import { createTaskListDialogToken } from "features/task-list/domain/constants";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { TaskListCreateDialog } from "../widgets/task-list-create-dialog/TaskListCreateDialogWidget";

export function useTaskListShowCreateDialogCase() {
  const {
    dialogOpenHandler,
    dialogRegisterHandler,
    dialogUnregisterHandler,
  } = useDialogContext();

  useEffect(() => {
    dialogRegisterHandler(createTaskListDialogToken, TaskListCreateDialog);

    return () => dialogUnregisterHandler(createTaskListDialogToken);
  }, [dialogRegisterHandler, dialogUnregisterHandler]);

  const showTaskListCreateDialog = useCallback(() => {
    dialogOpenHandler(createTaskListDialogToken);
  }, [dialogOpenHandler]);

  const events = useRef(new Map());
  const subscribable = useMemo(() => new Map(), []);
  const dispatchable = useMemo(
    () => new Map([["task-list/create-dialog/show", showTaskListCreateDialog]]),
    [showTaskListCreateDialog]
  );

  return useCaseFactory({ dispatchable, subscribable, events });
}
