import { useCallback } from "react";
import { useDispatch } from "react-redux";

export function useDispatchAction(action) {
  const dispatch = useDispatch();

  const invokeAction = useCallback((...args) => dispatch(action(...args)), [
    action,
    dispatch,
  ]);

  return invokeAction;
}
