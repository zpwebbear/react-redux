export function closeDialog(state, action){
    const oldDialogState = state.get(action.payload.id);
    const newState = state.set(action.payload.id, {
      ...oldDialogState,
      state: false,
      timestamp: null,
    });
    return new Map(newState);
}