import { useDialogContext } from "app/dialog/application/context/useDialogContext";

export function useTaskListCloseCreateDialog() {
  const { dialogCloseHandler } = useDialogContext();
  return {
    closeTaskListCreateDialog: () => {
      dialogCloseHandler("task-list/create");
    },
  };
}
