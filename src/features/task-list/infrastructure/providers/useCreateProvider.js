import { useCallback } from "react";

export function useCreateProvider() {

  

  const subscribe = useCallback(
    (token) => {
      return subscribable[token];
    },
    [subscribable]
  );

  const dispatch = useCallback(
    ({ type, payload }) => {
      dispatchable[type](payload);
    },
    [dispatchable]
  );
}
