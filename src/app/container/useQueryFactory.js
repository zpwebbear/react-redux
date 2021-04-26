import { useCallback } from "react";

export const useQueryFactory = ({ subscribable }) => {
  const subscribe = useCallback(
    (token) => {
      if (![...subscribable.keys()].includes(token)) {
        throw new Error(
          `Variable with token ${token} is not available to subscribe`
        );
      }
      return subscribable.get(token);
    },
    [subscribable]
  );

  return { subscribe };
};
