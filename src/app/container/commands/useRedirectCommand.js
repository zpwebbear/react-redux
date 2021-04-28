import { useCallback, useMemo } from "react";
import { useHistory } from "react-router";
import { createHookEntity } from "../utils/createHookEntity";
import { useCommandFactory } from "../utils/useCommandFactory";

export const useRedirectCommand = () => {
  const history = useHistory();

  const redirectTo = useCallback(
    (path) => {
      history.push(path);
    },
    [history]
  );

  const dispatchable = useMemo(
    () => createHookEntity({ "redirect-to": redirectTo }),
    [redirectTo]
  );

  return useCommandFactory({ dispatchable });
};
