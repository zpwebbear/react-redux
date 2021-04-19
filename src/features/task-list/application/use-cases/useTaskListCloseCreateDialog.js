import { useDialogContext } from "app/dialog/application/context/useDialogContext";
import { useCaseFactory } from "app/use-case/use-case-factory/useCaseFactory";
import { useCallback, useMemo, useRef } from "react";

export const useTaskListCloseCreateDialog = () => {
  const { dialogCloseHandler } = useDialogContext();

  const events = useRef(new Map());
  const subscribable = useMemo(() => new Map(), []);

  const closeTaskListCreateDialog = useCallback(() => {
    dialogCloseHandler("task-list/create");
  }, [dialogCloseHandler]);

  const dispatchable = useMemo(
    () =>
      new Map([["task-list/close-create-dialog", closeTaskListCreateDialog]]),
    [closeTaskListCreateDialog]
  );

  return useCaseFactory({ dispatchable, subscribable, events });
};
