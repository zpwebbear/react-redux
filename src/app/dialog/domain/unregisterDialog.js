//@ts-check
/**
 * @param {import("../application/context/DialogContextProvider").DialogContextState} state
 * @param {import('../application/context/DialogContextProvider').DialogContextAction} action
 */
export function unregisterDialog(state, action) {
  state.delete(action.payload.id);

  return new Map(state);
}
