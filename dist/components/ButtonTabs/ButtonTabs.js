import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import React, { useEffect, useRef, useState } from "react";
import { ButtonTabsContext } from "./buttonTabs.context";
import { styles } from "./buttonTabs.styles";
export const ButtonTabs = ({ children, className, defaultValue, onValueChange, }) => {
    const [value, setValue] = useState(defaultValue || "");
    const [activeIndex, setActiveIndex] = useState(0);
    const tabsRef = useRef(null);
    const contextValue = {
        value,
        setValue,
        activeIndex,
        setActiveIndex,
    };
    useEffect(() => {
        if (value && onValueChange) {
            onValueChange(value);
        }
    }, [value, onValueChange]);
    return (_jsx(ButtonTabsContext.Provider, Object.assign({ value: contextValue }, { children: _jsx("div", Object.assign({ className: className, css: styles.tabsRoot }, { children: _jsx("div", Object.assign({ css: styles.tabs, ref: tabsRef }, { children: React.Children.map(children, (child, index) => React.cloneElement(child, {
                    index
                })) })) })) })));
};
