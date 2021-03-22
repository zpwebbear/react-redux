import { closeActiveOnTopDialog } from "features/dialog/domain/closeActiveOnTopDialog";
import { closeDialog } from "features/dialog/domain/closeDialog";
import { openDialog } from "features/dialog/domain/openDialog";
import { registerDialog } from "features/dialog/domain/registerDialog";
import { toggleDialog } from "features/dialog/domain/toggleDialog";
import { unregisterDialog } from "features/dialog/domain/unregisterDialog";
import React, { useCallback, useMemo, useReducer } from "react";
import ReactDOM from "react-dom";

export const DialogContext = React.createContext({});

const initialState = new Map();

function reducer(state, action) {
  switch (action.type) {
    case "dialog/open": {
      return openDialog(state, action);
    }
    case "dialog/close": {
      return closeDialog(state, action);
    }
    case "dialog/toggle": {
      return toggleDialog(state, action);
    }
    case "dialog/close-active-on-top": {
      return closeActiveOnTopDialog(state, action);
    }
    case "dialog/register": {
      return registerDialog(state, action);
    }
    case "dialog/unregister": {
      return unregisterDialog(state, action);
    }
    default:
      return state;
  }
}

export const DialogContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dialogOpenHandler = useCallback((id) => {
    dispatch({ type: "dialog/open", payload: { id } });
  }, []);

  const dialogCloseHandler = useCallback((id) => {
    dispatch({ type: "dialog/close", payload: { id } });
  }, []);

  const dialogToggleHandler = useCallback((id) => {
    dispatch({ type: "dialog/toggle", payload: { id } });
  }, []);

  const dialogRegisterHandler = useCallback((id, component) => {
    dispatch({ type: "dialog/register", payload: { id, component } });
  }, []);

  const dialogUnregisterHandler = useCallback((id) => {
    dispatch({ type: "dialog/unregister", payload: { id } });
  }, []);

  const dialogs = useMemo(() => {
    return [...state.values()]
      .filter((value) => value.state)
      .sort((a, b) => a.timestamp > b.timestamp)
      .map((value) => value.component);
  }, [state]);

  return (
    <DialogContext.Provider
      value={{
        state,
        dialogToggleHandler,
        dialogOpenHandler,
        dialogCloseHandler,
        dialogRegisterHandler,
        dialogUnregisterHandler,
      }}
    >
      <>
        {children}
        {dialogs.map((Dialog) =>
          ReactDOM.createPortal(<Dialog />, document.body)
        )}
      </>
    </DialogContext.Provider>
  );
};
