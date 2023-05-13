import Joi from "joi";
interface UseFormValidationValues {
    [key: string]: unknown;
}
interface SchemaValidation {
    [key: string]: {
        isValid: boolean;
        hasBeenFilled: boolean;
        errors: string[];
    };
}
interface UseFormValidationResult {
    validate: () => void;
    isValid: boolean;
    result: SchemaValidation;
}
export declare const useFormValidation: (values: UseFormValidationValues, schema: Joi.ObjectSchema) => UseFormValidationResult;
export {};
//# sourceMappingURL=useFormValidation.d.ts.map