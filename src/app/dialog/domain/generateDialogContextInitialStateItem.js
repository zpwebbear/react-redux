//@ts-check
import { generateDialogContextItemValue } from "./generateDialogContextItemValue";

/**
 * @param {string} dialogItemId
 * @param {import('../application/context/DialogContextProvider').AppDialogContext['component']} Component
 * @returns {[string, import('../application/context/DialogContextProvider').AppDialogContext]}
 */
export function generateDialogContextInitialStateItem(dialogItemId, Component) {
  return [dialogItemId, generateDialogContextItemValue(Component)];
}
