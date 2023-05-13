import React from "react";
import { SpacingValue } from "../../hooks";
export interface InputBooleanProps {
    name?: string;
    label?: string;
    value: boolean;
    disabled?: boolean;
    labelFalsy?: string;
    labelTruthy?: string;
    spacing?: SpacingValue;
    onChange: (value: boolean) => void;
}
export declare const InputBoolean: React.FC<InputBooleanProps>;
//# sourceMappingURL=InputBoolean.d.ts.map