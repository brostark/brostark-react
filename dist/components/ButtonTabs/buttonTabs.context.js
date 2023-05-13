import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { createContext, useState } from "react";
export const ButtonTabsContext = createContext({
    value: "",
    setValue: () => { },
});
export const ButtonTabsProvider = ({ children }) => {
    const [value, setValue] = useState("");
    const contextValue = {
        value,
        setValue,
    };
    return (_jsx(ButtonTabsContext.Provider, Object.assign({ value: contextValue }, { children: children })));
};
