import { useCaseConfig } from "appConfig";
import React, { useContext, useState } from "react";

export const UseCaseContainerContext = React.createContext({});

export const useCase = (token) => {
  const { useCases } = useContext(UseCaseContainerContext);

  return  useCases.get(token);
};

export const UseCaseContainer = ({ children }) => {
  const [useCaseContainer] = useState(new Map(useCaseConfig));

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
