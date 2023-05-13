import React, { CSSProperties, ReactNode } from "react";
import { SpacingValue } from "../../hooks";
interface FieldsetProps {
    label?: string;
    fullWidth?: boolean;
    className?: string;
    focused?: boolean;
    children?: ReactNode;
    style?: CSSProperties;
    spacing?: SpacingValue;
    disableHover?: boolean;
    disablePadding?: boolean;
    onClick?: (e: React.MouseEvent<HTMLFieldSetElement>) => void;
}
export declare const Fieldset: React.FC<FieldsetProps>;
export {};
//# sourceMappingURL=Fieldset.d.ts.map