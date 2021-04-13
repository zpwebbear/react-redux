//@ts-check

/**
 * @param {import("../application/context/DialogContextProvider").DialogContextState} state
 * @param {import('../application/context/DialogContextProvider').DialogContextAction} action
 */
export function toggleDialog(state, action) {
  const oldDialogState = state.get(action.payload.id);
  const newState = state.set(action.payload.id, {
    ...oldDialogState,
    state: !oldDialogState.state,
    timestamp: !oldDialogState.state ? Date.now() : null,
  });
  return new Map(newState);
}
