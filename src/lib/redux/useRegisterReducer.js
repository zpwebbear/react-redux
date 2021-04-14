import { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";

/**
 *
 * @param {string} token
 * @param {import('redux').ReducersMapObject} reducer
 */
export function useRegisterReducer(token, reducer) {
  const store = useStore();
  const dispatch = useDispatch();

  useEffect(() => {
    store.reducerManager.add(token, reducer);
    dispatch({ type: `@@REGISTER/${token}` });

    return () => {
      store.reducerManager.remove(token);
      dispatch({ type: `@@UNREGISTER/${token}` });
    };
  }, [dispatch, reducer, store, token]);
}
