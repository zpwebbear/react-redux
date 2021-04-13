import { useSelector } from "react-redux";

export function useSelectState(selector, ...params) {

  return useSelector(state => selector(state, ...params));
}