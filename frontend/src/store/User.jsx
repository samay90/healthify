import { createContext } from "react";

export const userContext = createContext({});

export const UserProvider = ({ children, value }) => {
  return (
    <userContext.Provider value={value}>
      {children}
    </userContext.Provider>
  );
};