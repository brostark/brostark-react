import { OutlinedTextFieldProps } from "@mui/material";
import React, { ClipboardEventHandler, ReactNode } from "react";
import { SpacingValue } from "../../hooks";
interface InputPasswordProps extends Omit<OutlinedTextFieldProps, "variant"> {
    value?: string | number;
    fullWidth?: boolean;
    placeholder?: string;
    spacing?: SpacingValue;
    disabled?: boolean;
    isLoading?: boolean;
    helperText?: string;
    label?: string;
    name?: string;
    success?: boolean;
    errorText?: ReactNode;
    onPaste?: ClipboardEventHandler<HTMLDivElement>;
    onPressEnter?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export declare const InputPassword: React.FC<InputPasswordProps>;
export {};
//# sourceMappingURL=InputPassword.d.ts.map