import { useContext } from "react";
import { DialogContext } from "./DialogContextProvider";

export function useDialogContext() {
  return useContext(DialogContext);
}
