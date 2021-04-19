import { useMutation } from "react-query";

export const queryHookFactory = (api, method) => {
  return (mutationOptions = {}) =>
    useMutation((props) => api[method](props), { ...mutationOptions });
};
