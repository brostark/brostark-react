import React from "react";
import { SpacingValue } from "../../hooks";
interface InputListProps {
    name?: string;
    label?: string;
    value: string[];
    disabled?: boolean;
    placeholder?: string;
    spacing?: SpacingValue;
    onChange: (values: string[]) => void;
    inputListItemProps?: (value: string, index: number) => {
        LeftComponent?: React.ReactElement;
    };
}
export declare const InputList: React.FC<InputListProps>;
export {};
//# sourceMappingURL=InputList.d.ts.map