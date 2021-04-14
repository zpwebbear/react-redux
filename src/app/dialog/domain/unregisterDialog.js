export function unregisterDialog(state, action) {
  state.delete(action.payload.id);

  return new Map(state);
}
