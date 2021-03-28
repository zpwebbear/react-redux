import { useSelector } from "react-redux";

export function useSelectState(selector) {

  return useSelector(selector);
}