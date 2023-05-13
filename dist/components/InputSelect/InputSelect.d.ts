import React, { ReactNode } from "react";
import { SpacingValue } from "../../hooks";
import { OnChangeEvent } from "../../lib";
export interface InputSelectProps<T = string> {
    name?: string;
    label?: string;
    value: T | T[];
    disabled?: boolean;
    errorText?: string;
    mulitple?: boolean;
    isLoading?: boolean;
    children?: ReactNode;
    spacing?: SpacingValue;
    disableDefault?: boolean;
    onChange: (e: OnChangeEvent<string | string[]>) => void;
    renderMultipleLabel?: (value: unknown | string) => string;
}
export declare const InputSelect: React.FC<InputSelectProps>;
//# sourceMappingURL=InputSelect.d.ts.map