import { useCommandFactory } from "./useCommandFactory";
import { useEventFactory } from "./useEventFactory";
import { useQueryFactory } from "./useQueryFactory";

export const useCaseFactory = (props) => {
  const { dispatch } = useCommandFactory(props);

  const { subscribe } = useQueryFactory(props);

  const { addEventListener } = useEventFactory(props);

  return { dispatch, addEventListener, subscribe };
};
