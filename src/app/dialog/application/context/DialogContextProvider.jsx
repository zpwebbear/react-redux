import { closeActiveOnTopDialog } from "app/dialog/domain/closeActiveOnTopDialog";
import { closeDialog } from "app/dialog/domain/closeDialog";
import { openDialog } from "app/dialog/domain/openDialog";
import { registerDialog } from "app/dialog/domain/registerDialog";
import { toggleDialog } from "app/dialog/domain/toggleDialog";
import { unregisterDialog } from "app/dialog/domain/unregisterDialog";
import React, { useCallback, useMemo, useReducer } from "react";
import ReactDOM from "react-dom";

/**
 * @type {React.Context<Partial<{
 *  state: DialogContextState;
 *  dialogToggleHandler: (id:string)=>void;
 *  dialogOpenHandler: (id:string)=>void;
 *  dialogCloseHandler: (id:string)=>void;
 *  dialogRegisterHandler: (id:string, component: AppDialogContext['component'])=>void;
 *  dialogUnregisterHandler: (id:string)=>void;
 * }>>}
 * */
export const DialogContext = React.createContext({});

/**
 * @typedef {{
 * state: boolean;
 * timestamp:number;
 * component: import('react').FunctionComponent
 * }} AppDialogContext
 */

/**
 * @typedef {{
 *  type:string;
 *  payload:{
 *    id: string;
 *    component?: AppDialogContext['component']
 *  }
 * }} DialogContextAction
 */

/**
 * @typedef {Map<string,AppDialogContext>} DialogContextState
 */

/**
 * @type {DialogContextState}
 */
const initialState = new Map();

/**
 * @param {typeof initialState} state
 * @param {DialogContextAction} action
 */
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
      return closeActiveOnTopDialog(state);
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
  /**
   * @type {(id:string)=>void}
   */
  const dialogOpenHandler = useCallback((id) => {
    dispatch({ type: "dialog/open", payload: { id } });
  }, []);

  /**
   * @type {(id:string)=>void}
   */
  const dialogCloseHandler = useCallback((id) => {
    dispatch({ type: "dialog/close", payload: { id } });
  }, []);

  /**
   * @type {(id:string)=>void}
   */
  const dialogToggleHandler = useCallback((id) => {
    dispatch({ type: "dialog/toggle", payload: { id } });
  }, []);

  /**
   * @type {(id:string, component: AppDialogContext['component'])=>void}
   */
  const dialogRegisterHandler = useCallback((id, component) => {
    dispatch({ type: "dialog/register", payload: { id, component } });
  }, []);

  const dialogUnregisterHandler = useCallback((id) => {
    dispatch({ type: "dialog/unregister", payload: { id } });
  }, []);

  const dialogs = useMemo(() => {
    return [...state.values()]
      .filter((value) => value.state)
      .sort((a, b) => a.timestamp - b.timestamp)
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
          ReactDOM.createPortal(<Dialog />, document.body),
        )}
      </>
    </DialogContext.Provider>
  );
};
