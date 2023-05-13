import React from "react";
export interface ButtonTabsProviderProps {
    children?: React.ReactNode;
}
export interface ButtonTabsProviderContext {
    value: string;
    activeIndex?: number;
    setActiveIndex?: (index: number) => unknown;
    setValue: (value: string, index?: number) => unknown;
}
export declare const ButtonTabsContext: React.Context<ButtonTabsProviderContext>;
export declare const ButtonTabsProvider: React.FC<ButtonTabsProviderProps>;
//# sourceMappingURL=buttonTabs.context.d.ts.map