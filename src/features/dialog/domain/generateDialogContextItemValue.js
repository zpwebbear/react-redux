//@ts-check

/**
 * @param {import('../application/context/DialogContextProvider').AppDialogContext['component']} Component
 * @returns {import('../application/context/DialogContextProvider').AppDialogContext}
 */
export function generateDialogContextItemValue(Component) {
  return {
    state: false,
    timestamp: null,
    component: Component,
  };
}
