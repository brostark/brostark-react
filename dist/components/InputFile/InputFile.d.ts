import React, { ElementType } from "react";
import { SpacingValue } from "../../hooks";
import { OnChangeEvent } from "../../lib";
import { FileAccept } from "./inputFile.helpers";
interface InputFileProps {
    name: string;
    label?: string;
    accept?: FileAccept | FileAccept[];
    single?: boolean;
    disabled?: boolean;
    icon?: ElementType;
    placeholder?: string;
    spacing?: SpacingValue;
    displayMedias?: boolean;
    value: string | string[];
    onChange?: (e: OnChangeEvent<string | string[]>) => void;
}
export declare const InputFile: React.FC<InputFileProps>;
export {};
//# sourceMappingURL=InputFile.d.ts.map