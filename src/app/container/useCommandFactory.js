import { useCallback } from "react";

export const useCommandFactory = ({ dispatchable }) => {
  const dispatch = useCallback(
    ({ type, payload }) => {
      if (![...dispatchable.keys()].includes(type)) {
        throw new Error(
          `Action with type ${type} is not available to dispatch`
        );
      }
      const fn = dispatchable.get(type);
      fn(payload);
    },
    [dispatchable]
  );

  return { dispatch };
};
