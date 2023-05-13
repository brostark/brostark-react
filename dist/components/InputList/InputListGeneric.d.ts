import React from "react";
import { SpacingValue } from "../../hooks";
export interface InputListItemProps<T> {
    value: T;
    index: number;
    onChange: (value: T) => void;
    onDelete: () => void;
}
export interface InputListGenericProps<T> {
    name?: string;
    label?: string;
    value: T[];
    limit?: number;
    disabled?: boolean;
    placeholder?: string;
    defaultValue: (() => T) | T;
    spacing?: SpacingValue;
    onChange: (values: T[]) => void;
    renderItem: (props: InputListItemProps<T>) => React.ReactNode;
}
export declare const InputListGeneric: <T>({ name, label, value, limit, spacing, onChange, disabled, renderItem, placeholder, defaultValue, }: InputListGenericProps<T>) => import("@emotion/react/jsx-runtime").JSX.Element;
//# sourceMappingURL=InputListGeneric.d.ts.map