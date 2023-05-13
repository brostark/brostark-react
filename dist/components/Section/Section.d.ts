import { TypographyProps } from "@mui/material";
import React, { ReactNode } from "react";
interface SectionProps {
    title: string;
    open?: boolean;
    first?: boolean;
    disabled?: boolean;
    className?: string;
    children: ReactNode;
    leftIcon?: ReactNode;
    defaultClosed?: boolean;
    titleProps?: TypographyProps;
    onChange?: (open: boolean) => void;
}
export declare const Section: React.FC<SectionProps>;
export {};
//# sourceMappingURL=Section.d.ts.map