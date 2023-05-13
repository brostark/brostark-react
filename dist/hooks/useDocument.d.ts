import { FirestoreModel } from "../lib/firestoreModel";
import { FirestoreDocument } from "../lib";
export declare const useDocument: <T extends FirestoreDocument>(model: FirestoreModel<T, undefined>, id?: string) => {
    item: T;
    refresh: () => Promise<void>;
};
//# sourceMappingURL=useDocument.d.ts.map