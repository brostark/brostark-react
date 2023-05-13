import React, { SyntheticEvent } from "react";
import { SpacingValue } from "../../hooks";
interface ButtonProps {
    className?: string;
    color?: "primary" | "secondary" | "inherit" | "success" | "error" | "info" | "warning";
    variant?: "contained" | "outlined" | "text";
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    isLoading?: boolean;
    href?: string;
    to?: string;
    target?: string;
    onClick?: (e: SyntheticEvent) => void;
    fullWidth?: boolean;
    spacing?: SpacingValue;
    children?: React.ReactNode;
}
export declare const Button: React.FC<ButtonProps>;
export {};
//# sourceMappingURL=Button.d.ts.map