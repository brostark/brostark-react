import { FirestoreDocument, FirestoreSchema } from "../../lib/types";
export interface FirestoreEditedItem {
    id?: string;
    [key: string]: unknown;
}
interface FormDocumentProps<T> {
    item?: T | null;
    isLoading?: boolean;
    schema: FirestoreSchema[];
    onChange?: (nextItem: FirestoreEditedItem, previousItem?: T | null) => void;
}
export declare const FormDocument: <T extends FirestoreDocument>({ item, schema, onChange, isLoading: parentIsLoading, }: FormDocumentProps<T>) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FormDocument.d.ts.map