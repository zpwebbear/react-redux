import { useMemo } from "react";
import { createHookEntity } from "./createHookEntity";

export const useCreateSubscribable = (subscribable, dependencies) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => createHookEntity(subscribable), [...dependencies]);
};
