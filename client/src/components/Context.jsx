import React, { createContext, useState } from "react";
import { loginCheck } from "../utils/loginApprove";

export const AppContext = createContext();

const ParentContext = ({ children }) => {
  const [login, setLogin] = useState(loginCheck());

  return (
    <AppContext.Provider
      value={{
        login,
        setLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ParentContext