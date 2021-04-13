//@ts-check
import { useCallback } from "react";
import { useHistory } from "react-router";

export function useRedirect() {
  const history = useHistory();
  /** @type {(path:string)=>void} */
  const redirectTo = useCallback(
    (path) => {
      return () => void history.push(path);
    },
    [history],
  );

  return { redirectTo };
}
