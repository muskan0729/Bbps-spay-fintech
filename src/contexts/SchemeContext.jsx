// contexts/SchemeContext.jsx
import { createContext, useState } from "react";

export const SchemeContext = createContext();

export const SchemeContextProvider = ({ children }) => {
  const [isModelOpen, setIsModelOpen] = useState(false);

  return (
    <SchemeContext.Provider value={{ isModelOpen, setIsModelOpen }}>
      {children}
    </SchemeContext.Provider>
  );
};
