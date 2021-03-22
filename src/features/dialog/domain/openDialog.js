export function openDialog(state, action) {
  const oldDialogState = state.get(action.payload.id);
  const newState = state.set(action.payload.id, {
    ...oldDialogState,
    state: true,
    timestamp: Date.now(),
  });

  return new Map(newState);
}
