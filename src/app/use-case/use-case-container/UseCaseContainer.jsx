import { useCaseRegistry } from "app-config";
import React, { useContext, useMemo, useState } from "react";

export const UseCaseContainerContext = React.createContext({});

export const useCase = (token) => {
  const { useCases } = useContext(UseCaseContainerContext);
  if (!useCases.has(token)) {
    throw new Error(
      `There are no registered use cases with the next token - ${token}`
    );
  }
  const useCaseByToken = useMemo(() => useCases.get(token), [token, useCases]);

  return useCaseByToken();
};

export const UseCaseContainer = ({ children }) => {
  const [useCaseContainer] = useState(new Map(useCaseRegistry));

  console.log("useCaseContainer", useCaseContainer);
  return (
    <UseCaseContainerContext.Provider
      value={{
        useCases: useCaseContainer,
      }}
    >
      {children}
    </UseCaseContainerContext.Provider>
  );
};
