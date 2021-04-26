import { useCallback } from "react";

export const useEventFactory = ({ events }) => {
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

  return { addEventListener };
};
