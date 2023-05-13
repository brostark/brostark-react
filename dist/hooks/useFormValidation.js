import { useState } from "react";
import messagesFr from "../lib/intl/joi_fr.json";
export const useFormValidation = (values, schema) => {
    const [isValid, setIsValid] = useState(false);
    const [result, setResult] = useState(Object.keys(values).reduce((acc, key) => {
        acc[key] = {
            errors: [],
            isValid: false,
            hasBeenFilled: false,
        };
        return acc;
    }, {}));
    const validate = () => {
        const nextResult = Object.assign({}, result);
        const schemaValidation = schema.validate(values, {
            abortEarly: false,
            messages: messagesFr,
        });
        const details = schemaValidation.error ? schemaValidation.error.details : [];
        Object.keys(values).forEach((key) => {
            const resultAttribute = nextResult[key];
            const errors = details.filter(detail => { var _a; return ((_a = detail.context) === null || _a === void 0 ? void 0 : _a.key) === key; }).map(detail => detail.message);
            resultAttribute.hasBeenFilled = resultAttribute.hasBeenFilled || !!values[key];
            resultAttribute.isValid = !errors.length && resultAttribute.hasBeenFilled;
            resultAttribute.errors = resultAttribute.hasBeenFilled ? errors : [];
        });
        setResult(nextResult);
        setIsValid(!schemaValidation.error);
    };
    return {
        result,
        isValid,
        validate,
    };
};
