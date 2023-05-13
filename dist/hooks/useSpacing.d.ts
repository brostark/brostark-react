import React from "react";
export interface SpacingOptions {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    x?: number;
    y?: number;
}
export type SpacingValue = true | number | SpacingOptions;
export declare const useSpacing: (spacing?: SpacingValue, defaultStyle?: React.CSSProperties) => React.CSSProperties;
//# sourceMappingURL=useSpacing.d.ts.map