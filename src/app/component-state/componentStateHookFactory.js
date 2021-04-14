function validateContext(context, contextList) {
  if (!context) {
    throw new Error("Please pass the component context");
  }

  if (!contextList.includes(context)) {
    throw new Error(
      `Please pass one of the next context types: ${contextList.toLocaleString()}`
    );
  }
}

export function componentStateHookFactory(hooks, contextList = []) {
  return (props) => {
    const { context, ...restProps } = props;
    
    validateContext(context, contextList);

    const useHook = hooks[context];

    return useHook(restProps);
  };
}
