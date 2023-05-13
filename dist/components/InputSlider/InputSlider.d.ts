import React from "react";
import { SpacingValue } from "../../hooks";
import { OnChangeEvent } from "../../lib";
export interface InputSliderProps {
    min?: number;
    max?: number;
    name: string;
    value: number;
    label?: string;
    disabled?: boolean;
    isLoading?: boolean;
    spacing?: SpacingValue;
    onChange: (e: OnChangeEvent<number>) => void;
}
export declare const InputSlider: React.FC<InputSliderProps>;
//# sourceMappingURL=InputSlider.d.ts.map