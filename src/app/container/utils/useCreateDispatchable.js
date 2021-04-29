
import { useMemo } from "react";
import { createHookEntity } from "./createHookEntity";

export const useCreateDispatchable = (dispatchable, dependencies) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => createHookEntity(dispatchable), [...dependencies]);
};
