import { generateDialogContextInitialStateItem } from "./generateDialogContextInitialStateItem";

export function registerDialog(state, action) {
  const item = generateDialogContextInitialStateItem(
    action.payload.id,
    action.payload.component
  );
  const newState = state.set(...item);
  return new Map(newState);
}
