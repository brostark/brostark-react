import React, { ReactNode } from "react";
interface ButtonTabProps {
    label: ReactNode;
    value: string;
    index?: number;
    color?: "primary" | "secondary" | "default";
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}
export declare const ButtonTab: React.FC<ButtonTabProps>;
export {};
//# sourceMappingURL=ButtonTab.d.ts.map