//@ts-check

/**
 * @param {import("../application/context/DialogContextProvider").DialogContextState} state
 */
export function closeActiveOnTopDialog(state) {
  const [activeOnTopId] = [...state.entries()]
    .filter(([, aValue]) => aValue.timestamp !== null)
    .sort(([, aKey], [, bKey]) => aKey.timestamp - bKey.timestamp)
    .pop();
  const oldDialogState = state.get(activeOnTopId);
  const newState = state.set(activeOnTopId, {
    ...oldDialogState,
    state: false,
    timestamp: null,
  });
  return new Map(newState);
}
