import { isValidEmail } from "../../helpers/utils";
import { FirestoreSchemaType } from "../../lib/types";

export const isFieldValueValid = (type: FirestoreSchemaType, value: unknown): boolean => {
  switch (type) {
    case FirestoreSchemaType.email: return isValidEmail(value as string);
    default: return typeof value !== "undefined" && !!value;
  }
};