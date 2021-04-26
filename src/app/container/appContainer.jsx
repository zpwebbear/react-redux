import { useCaseRegistry, useQueryRegistry } from "app-config";
import React, { useContext, useMemo, useState } from "react";
import { useCommandRegistry } from "../../app-config";

export const AppContainerContext = React.createContext({});

const errorMessageConstructor = (entityTypeName) => (_, token) =>
  `There are no registered ${entityTypeName} with the next token - ${token}`;

const errorFunctionsMap = {
  cases: errorMessageConstructor("use cases"),
  queries: errorMessageConstructor("use queries"),
  commands: errorMessageConstructor("commands"),
};

const appContainerHookFactory = (entityType) => {
  function useAppContainerHook(token, params) {
    const context = useContext(AppContainerContext);
    const entity = context[entityType];
    if (!entity.has(token)) {
      throw new Error(errorFunctionsMap[entityType]`${token}`);
    }

    const useEntityByToken = useMemo(() => entity.get(token), [entity, token]);

    return useEntityByToken(params);
  }

  return useAppContainerHook;
};

export const useCase = appContainerHookFactory("cases");
export const useQuery = appContainerHookFactory("queries");
export const useCommands = appContainerHookFactory("commands");

export const AppContainer = ({ children }) => {
  const [useCaseContainer] = useState(new Map(useCaseRegistry));
  const [useQueryContainer] = useState(new Map(useQueryRegistry));
  const [useCommandContainer] = useState(new Map(useCommandRegistry));

  return (
    <AppContainerContext.Provider
      value={{
        cases: useCaseContainer,
        queries: useQueryContainer,
        commands: useCommandContainer,
      }}
    >
      {children}
    </AppContainerContext.Provider>
  );
};
