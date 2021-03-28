import React from "react";

export const DisabledPropertyProvider = ({ children, isDisabled }) => {
  return React.cloneElement(children, { disabled: isDisabled });
};
