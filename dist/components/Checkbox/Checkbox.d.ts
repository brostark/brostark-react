import React from "react";
import { CheckboxProps as MuiCheckboxProps } from "@mui/material";
interface CheckboxProps extends MuiCheckboxProps {
    label?: string;
    labelProps?: any;
    margin?: boolean;
    className?: string;
    color?: "primary" | "secondary";
}
export declare const Checkbox: React.FC<CheckboxProps>;
export {};
//# sourceMappingURL=Checkbox.d.ts.map