import { providerContainerConfig } from "appConfig";
import React, { useContext, useState } from "react";

export const ProviderContainerContext = React.createContext({});

/**
 * @param {string} token
 */
export const useProvider = (token) => {
  const { providers } = useContext(ProviderContainerContext);

  const provider = providers.get(token);
  return provider ? provider() : { subscribe: () => {}, dispatch: () => {} };
};

export const ProviderContainer = ({ children }) => {
  const [providersContainer] = useState(new Map(providerContainerConfig));

  return (
    <ProviderContainerContext.Provider
      value={{
        providers: providersContainer,
      }}
    >
      {children}
    </ProviderContainerContext.Provider>
  );
};
