import { FirestoreModel } from "../../lib/firestoreModel";
import { FirestoreDocument, OnChangeEvent } from "../../lib/types";
interface InputAutocompleteAsyncProps<T extends FirestoreDocument> {
    model: FirestoreModel<T>;
    margin?: boolean;
    fullWidth?: boolean;
    label?: string;
    name: string;
    value?: string;
    isLoading?: boolean;
    noOptionsText?: string;
    onChange: (e: OnChangeEvent) => void;
    getDocumentLabel: (item: T) => string;
}
export declare const InputAutocompleteAsync: <T extends FirestoreDocument>({ model, name, label, value, margin, onChange, fullWidth, noOptionsText, getDocumentLabel, isLoading: parentIsLoading, }: InputAutocompleteAsyncProps<T>) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=InputAutocompleteAsync.d.ts.map