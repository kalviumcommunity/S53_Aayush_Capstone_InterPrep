import React, { createContext, useState } from "react";

export const AppContext = createContext();

function Context({ children }) {
  return (
    <AppContext.Provider
      value={{
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default Context;