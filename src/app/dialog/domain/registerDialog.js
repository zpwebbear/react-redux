//@ts-check
import { generateDialogContextInitialStateItem } from "./generateDialogContextInitialStateItem";

/**
 * @param {import("../application/context/DialogContextProvider").DialogContextState} state
 * @param {import('../application/context/DialogContextProvider').DialogContextAction} action
 */
export function registerDialog(state, action) {
  const item = generateDialogContextInitialStateItem(
    action.payload.id,
    action.payload.component,
  );
  const newState = state.set(...item);
  return new Map(newState);
}
