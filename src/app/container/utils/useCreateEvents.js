import { useRef } from "react";
import { createHookEntity } from "./createHookEntity";

/**
 *
 * @param {Object} events
 * @returns
 */
export const useCreateEvents = (events) => {
  return useRef(createHookEntity(events));
};
