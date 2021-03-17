import { useCallback } from "react";
import { useHistory } from "react-router";

export function useRedirect() {
  const history = useHistory();
  const redirectTo = useCallback(
    (path) => {
      return () => history.push(path);
    },
    [history]
  );

  return { redirectTo };
}
