import React, { useContext, useReducer } from "react";

export const TaskCreateContext = React.createContext({});

export const TaskCreateProvider = ({ children }) => {
  const [, dispatch] = useReducer((state, action) => {
    
  });

  return (
    <TaskCreateContext.Provider value={{ dispatch }}>
      {children}
    </TaskCreateContext.Provider>
  );
};

export const useTaskCreateDispatch = () => {
  const context = useContext(TaskCreateContext);

  return context.dispatch;
};
