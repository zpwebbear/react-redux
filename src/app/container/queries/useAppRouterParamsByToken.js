import { useMemo } from "react";
import { useParams } from "react-router";
import { createHookEntity } from "../utils/createHookEntity";
import { useQueryFactory } from "../utils/useQueryFactory";

export const useAppRouterParamsByToken = ({ token }) => {
  const params = useParams();

  const subscribable = useMemo(
    () =>
      createHookEntity({
        [token]: params[token],
      }),
    [params, token]
  );

  return useQueryFactory({ subscribable });
};
