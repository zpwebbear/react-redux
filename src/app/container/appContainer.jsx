import { useCaseRegistry, useQueryRegistry } from "app-config";
import React, { useContext, useMemo, useState } from "react";
import { useCommandRegistry } from "../../app-config";

export const UseCaseContainerContext = React.createContext({});

export const useCase = (token, params) => {
  const { cases } = useContext(UseCaseContainerContext);
  if (!cases.has(token)) {
    throw new Error(
      `There are no registered use cases with the next token - ${token}`
    );
  }
  const useCaseByToken = useMemo(() => cases.get(token), [token, cases]);

  return useCaseByToken(params);
};

export const useQuery = (token, params) => {
  const { queries } = useContext(UseCaseContainerContext);
  if (!queries.has(token)) {
    throw new Error(
      `There are no registered queries with the next token - ${token}`
    );
  }
  const useQueryByToken = useMemo(() => queries.get(token), [token, queries]);

  return useQueryByToken(params);
};

export const useCommand = (token, params) => {
  const { commands } = useContext(UseCaseContainerContext);
  if (!commands.has(token)) {
    throw new Error(
      `There are no registered commands with the next token - ${token}`
    );
  }
  const useCommandByToken = useMemo(() => commands.get(token), [token, commands]);

  return useCommandByToken(params);
};

export const UseCaseContainer = ({ children }) => {
  const [useCaseContainer] = useState(new Map(useCaseRegistry));
  const [useQueryContainer] = useState(new Map(useQueryRegistry));
  const [useCommandContainer] = useState(new Map(useCommandRegistry));

  return (
    <UseCaseContainerContext.Provider
      value={{
        cases: useCaseContainer,
        queries: useQueryContainer,
        commands: useCommandContainer,
      }}
    >
      {children}
    </UseCaseContainerContext.Provider>
  );
};
