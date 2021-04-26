import { useCallback } from "react";

export const useCaseFactory = ({ dispatchable, subscribable, events }) => {
  const dispatch = useCallback(
    ({ type, payload }) => {
      if (![...dispatchable.keys()].includes(type)) {
        throw new Error(
          `Action with type ${type} is not available to dispatch`
        );
      }
      const fn = dispatchable.get(type);
      fn(payload);
    },
    [dispatchable]
  );

  const subscribe = useCallback(
    (token) => {
      if (![...subscribable.keys()].includes(token)) {
        throw new Error(
          `Variable with token ${token} is not available to subscribe`
        );
      }
      return subscribable.get(token);
    },
    [subscribable]
  );

  const addEventListener = useCallback(
    (eventName, cb) => {
      if (![...events.current.keys()].includes(eventName)) {
        throw new Error(
          `Event with name ${eventName} is not available to listen`
        );
      }

      const existedEventCallbacks = events.current.get(eventName) || [];
      events.current.set(eventName, [...existedEventCallbacks, cb]);
    },
    [events]
  );

  return { dispatch, addEventListener, subscribe };
};
