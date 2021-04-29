import { useMutation, useQuery } from "react-query";

export const reactQueryMutationFactory = (api, method) => {
  return (mutationOptions = {}) =>
    useMutation((props) => api[method](props), { ...mutationOptions });
};

export const reactQueryQueryFactory = (api, method, options) => {
  return ({ queryKey, queryFnParams, queryOptions = {} }) =>
    useQuery({
      queryKey,
      queryFn: () => api[method](queryFnParams),
      ...options,
      ...queryOptions,
    });
};
