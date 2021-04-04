import React, { useCallback, useContext } from "react";

export const ProviderContainerContext = React.createContext({});

export const useProvider = (token) => {
  const { providers } = useContext(ProviderContainerContext);

  const provider = providers.get(token);
  return provider ? provider() : ({ subscribe: () => {}, dispatch: () => {} });
};

export const useProviderRegister = () => {
  const { register, unregister } = useContext(ProviderContainerContext);

  return { register, unregister };
};

const providersContainer = new Map();

export const ProviderContainer = ({ children }) => {
  const register = useCallback((token, provider) => {
    providersContainer.set(token, provider);
  }, []);

  const unregister = useCallback((token) => {
    providersContainer.delete(token);
  }, []);

  return (
    <ProviderContainerContext.Provider
      value={{
        register,
        unregister,
        providers: providersContainer,
      }}
    >
      {children}
    </ProviderContainerContext.Provider>
  );
};
