import React from "react";
import "react-quill/dist/quill.snow.css";
import { SpacingValue } from "../../hooks";
import { OnChangeEvent } from "../../lib";
export interface RichTextProps {
    value: string;
    label?: string;
    name: string;
    disabled?: boolean;
    className?: string;
    spacing?: SpacingValue;
    onChange: (e: OnChangeEvent) => any;
}
export declare const RichText: React.FC<RichTextProps>;
//# sourceMappingURL=RichText.d.ts.map