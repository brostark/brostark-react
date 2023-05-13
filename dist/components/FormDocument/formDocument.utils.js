import { isValidEmail } from "../../helpers/utils";
import { FirestoreSchemaType } from "../../lib/types";
export const isFieldValueValid = (type, value) => {
    switch (type) {
        case FirestoreSchemaType.email: return isValidEmail(value);
        default: return typeof value !== "undefined" && !!value;
    }
};
