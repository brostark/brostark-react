import { OutlinedTextFieldProps } from "@mui/material";
import React, { ClipboardEventHandler, KeyboardEvent } from "react";
import { ReactNode } from "react";
import { SpacingValue } from "../../hooks";
export interface InputTextProps extends Omit<OutlinedTextFieldProps, "variant"> {
    type?: string;
    error?: boolean;
    success?: boolean;
    children?: ReactNode;
    value?: string | number;
    multiline?: boolean;
    fullWidth?: boolean;
    placeholder?: string;
    spacing?: SpacingValue;
    disabled?: boolean;
    isLoading?: boolean;
    helperText?: string;
    label?: string;
    name?: string;
    errorText?: ReactNode;
    LeftComponent?: React.ReactElement;
    RightComponent?: React.ReactElement;
    onPaste?: ClipboardEventHandler<HTMLDivElement>;
    onPressEnter?: (e: KeyboardEvent<HTMLDivElement>) => void;
}
export declare const InputText: React.FC<InputTextProps>;
//# sourceMappingURL=InputText.d.ts.map