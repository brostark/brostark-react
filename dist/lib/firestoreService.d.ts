import firebase from "firebase";
import { FirestoreDocument } from "./types";
export type QueryWhere = (string | Date | firebase.firestore.WhereFilterOp)[];
export interface GetAllOptions {
    limit?: number;
    orderBy?: string;
    direction?: "asc" | "desc";
    startAt?: string | number | Date;
    endAt?: string | number | Date;
    endBefore?: string | number | Date;
    startAfter?: string | number | Date;
    where?: QueryWhere;
}
export interface GetAllResult<T extends FirestoreDocument = FirestoreDocument> {
    items: T[];
    hasMore: boolean;
    hasPrevious: boolean;
    endBefore: string;
    startAfter: string;
}
export interface ICrudEntry {
    [key: string]: any;
}
export interface BulkAction {
    ref: firebase.firestore.DocumentReference;
    fields?: any;
    action: "update" | "set" | "delete" | string;
}
/**
 * Execute a buk operation
 * @param db - The database
 * @param actions - List of actions
 * @returns Promise
 */
export declare const bulkActions: (db: firebase.firestore.Firestore, actions: BulkAction[]) => Promise<void>;
export declare const crud: {
    get: <T>(ref: firebase.firestore.DocumentReference) => Promise<T>;
    set: <T_1>(ref: firebase.firestore.DocumentReference, values?: ICrudEntry) => Promise<T_1>;
    edit: (ref: firebase.firestore.DocumentReference, values?: ICrudEntry) => Promise<FirestoreDocument | null>;
    update: <T_2>(ref: firebase.firestore.DocumentReference, values?: ICrudEntry) => Promise<T_2>;
    getAll: <T_3 extends FirestoreDocument = FirestoreDocument>(ref: firebase.firestore.CollectionReference | firebase.firestore.Query, options?: GetAllOptions) => Promise<GetAllResult<T_3>>;
};
//# sourceMappingURL=firestoreService.d.ts.map