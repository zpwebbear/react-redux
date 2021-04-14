import { generateDialogContextItemValue } from "./generateDialogContextItemValue";

export function generateDialogContextInitialStateItem(dialogItemId, Component){
    return [dialogItemId, generateDialogContextItemValue(Component)]
}