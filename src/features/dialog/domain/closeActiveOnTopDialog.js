export function closeActiveOnTopDialog(state) {
  const oldDialogState = [...state.entries()];
  const [activeOnTopId] = [...state.entries()]
    .filter(([, aValue]) => aValue.timestamp !== null)
    .sort(([aKey], [bKey]) => aKey.timestamp > bKey.timestamp)
    .pop();
  const newState = state.set(activeOnTopId, {
    ...oldDialogState,
    state: false,
    timestamp: null,
  });
  return new Map(newState);
}
