import { StringSchema } from "joi";
import React, { ReactNode } from "react";
interface InputTextCase {
    schema: StringSchema;
    text: string | ReactNode;
}
interface InputValidationsProps {
    value: string;
    cases: InputTextCase[];
    hidden?: boolean;
    children: ReactNode;
}
export declare const InputValidations: React.FC<InputValidationsProps>;
export {};
//# sourceMappingURL=InputValidations.d.ts.map