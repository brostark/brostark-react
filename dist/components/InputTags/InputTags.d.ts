import React from "react";
import { SpacingValue } from "../../hooks";
import { OnChangeEvent } from "../../lib";
export interface InputTagsProps {
    name: string;
    label?: string;
    value: string[];
    disabled?: boolean;
    isLoading?: boolean;
    placeholder?: string;
    spacing?: SpacingValue;
    autoComplete?: boolean;
    onChange: (e: OnChangeEvent<string[]>) => void;
}
export declare const InputTags: React.FC<InputTagsProps>;
//# sourceMappingURL=InputTags.d.ts.map