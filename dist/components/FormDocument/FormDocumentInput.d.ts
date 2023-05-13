import { FirestoreDocument, FirestoreSchema, OnChangeEvent } from "../../lib/types";
interface FormDocumentInputProps<T extends FirestoreDocument> {
    item?: T | null;
    value: unknown;
    spacer?: boolean;
    isLoading?: boolean;
    field: FirestoreSchema;
    onChange: (e: OnChangeEvent<unknown>) => void;
}
export interface RenderFieldOptions {
    item: Record<string, unknown>;
    value: unknown;
}
export declare const FormDocumentInput: <T extends FirestoreDocument>({ field, spacer, onChange, isLoading, item: baseItem, value: baseValue, }: FormDocumentInputProps<T>) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FormDocumentInput.d.ts.map