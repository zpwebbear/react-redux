export const createHookEntity = (registry = {}) => {
  return new Map(Object.entries(registry));
};
