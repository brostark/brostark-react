import React, { createContext, useState } from "react";


export interface ButtonTabsProviderProps {
  children?: React.ReactNode;
}


export interface ButtonTabsProviderContext {
  value: string;
  activeIndex?: number;
  setActiveIndex?: (index: number) => unknown;
  setValue: (value: string, index?: number) => unknown;
}


export const ButtonTabsContext = createContext<ButtonTabsProviderContext>({
  value: "",
  setValue: () => {},
});


export const ButtonTabsProvider: React.FC<ButtonTabsProviderProps> = ({ children }) => {
  const [value, setValue] = useState("");

  const contextValue: ButtonTabsProviderContext = {
    value,
    setValue,
  };

  return (
    <ButtonTabsContext.Provider value={contextValue}>
      {children}
    </ButtonTabsContext.Provider>
  );
};
