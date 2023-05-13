import React from "react";
interface InputListItemProps {
    name: string;
    index: number;
    label?: string;
    value: string;
    disabled?: boolean;
    placeholder?: string;
    onDelete?: (index: number) => void;
    LeftComponent?: React.ReactElement;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>, index: number) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>, index: number) => void;
    onChange: (value: string, index: number) => void;
}
export declare const InputListItem: React.FC<InputListItemProps>;
export {};
//# sourceMappingURL=InputListItem.d.ts.map