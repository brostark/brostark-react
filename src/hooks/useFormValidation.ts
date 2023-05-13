import Joi from "joi";
import { useState } from "react";

import messagesEn from "../lib/intl/joi_en.json";
import messagesFr from "../lib/intl/joi_fr.json";


interface UseFormValidationValues {
  [key: string]: unknown;
}


interface SchemaValidation {
  [key: string]: {
    isValid: boolean;
    hasBeenFilled: boolean;
    errors: string[];
  }
}

interface UseFormValidationResult {
  validate: () => void;
  isValid: boolean;
  result: SchemaValidation;
}

export const useFormValidation = (values: UseFormValidationValues, schema: Joi.ObjectSchema): UseFormValidationResult => {
  const [isValid, setIsValid] = useState(false);
  const [result, setResult] = useState<SchemaValidation>(Object.keys(values).reduce((acc, key) => {
    (acc as any)[key] = {
      errors: [],
      isValid: false,
      hasBeenFilled: false,
    };

    return acc;
  }, {}));

  const validate = () => {
    const nextResult = {...result};

    const schemaValidation = schema.validate(values, {
      abortEarly: false,
      messages: messagesFr,
    });

    const details = schemaValidation.error ? schemaValidation.error.details : [];

    Object.keys(values).forEach((key) => {
      const resultAttribute = nextResult[key];
      const errors = details.filter(detail => detail.context?.key === key).map(detail => detail.message);

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
  }
};
