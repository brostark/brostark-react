import { FirestoreModel } from "../lib/firestoreModel";
import { GetAllOptions } from "../lib/firestoreService";
import { FirestoreDocument } from "../lib";
export declare const useCollection: <T extends FirestoreDocument>(model: FirestoreModel<T, unknown>, options?: GetAllOptions) => {
    next: () => Promise<void>;
    refresh: () => Promise<void>;
    items: T[];
    hasMore: boolean;
    startAfter: string;
};
//# sourceMappingURL=useCollection.d.ts.map