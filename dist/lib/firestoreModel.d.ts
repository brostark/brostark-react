import firebase from "firebase/app";
import { FirestoreEditedItem } from "../components/FormDocument/FormDocument";
import { FirebaseStorageOptions } from "./firebaseStorage";
import { GetAllOptions, GetAllResult } from "./firestoreService";
import { FirestoreDocument, FirestoreSchema } from "./types";
export interface FirestoreModelContext {
    [key: string]: string | Date | number;
}
export interface FirestoreModelSettings<T extends FirestoreDocument, K = undefined> {
    schema: FirestoreSchema[];
    getAllOptions?: GetAllOptions;
    onGetItem?: (data: T) => Promise<T>;
    onGetListItem?: (data: GetAllResult<T>) => Promise<GetAllResult<T>>;
    getQuery?: (db: firebase.firestore.Firestore, context?: K) => firebase.firestore.Query;
    getCollectionGroup?: (db: firebase.firestore.Firestore, context?: K) => firebase.firestore.Query;
    getReferenceInfoCollection?: (db: firebase.firestore.Firestore, context?: K) => firebase.firestore.DocumentReference;
    getReferenceCollection?: (db: firebase.firestore.Firestore, context?: K) => firebase.firestore.CollectionReference;
}
export interface IModelInfo {
    label: string;
    value: any;
}
type SaveItemFile<T extends FirestoreDocument> = {
    [key in Partial<keyof T>]: FirebaseStorageOptions;
};
interface SaveItemOptions<T extends FirestoreDocument> {
    files?: SaveItemFile<T>;
}
export declare class FirestoreModel<T extends FirestoreDocument = FirestoreDocument, K = undefined> {
    context?: K;
    /**
     * Called when retrieving data from firebase;
     */
    private onGetItem?;
    /**
     * Called when retrieving data from firebase (on list)
     */
    private onGetListItem?;
    /**
     * Get query from firebase
     */
    getQuery?: (db: firebase.firestore.Firestore, context?: K) => firebase.firestore.Query;
    /**
     * Get collection group
     */
    getCollectionGroup?: (db: firebase.firestore.Firestore, context?: K) => firebase.firestore.Query;
    /**
     * Get info about reference
     */
    getReferenceInfoCollection?: (db: firebase.firestore.Firestore, context?: K) => firebase.firestore.DocumentReference;
    /**
     * Get collection from document
     */
    getReferenceCollection?: (db: firebase.firestore.Firestore, context?: K) => firebase.firestore.CollectionReference;
    /**
     * Options to pass to getAll by default
     */
    getAllOptions?: GetAllOptions;
    /**
     * The schema for the form
     */
    schema: FirestoreSchema[];
    /**
     * @constructor
     * @param _attributes
     */
    constructor(settings: FirestoreModelSettings<T, K>, context?: K);
    /**
     * Parse Item file to upload it before saving it
     * @param item - The item to parse
     * @param fileOption - Option of the file
     */
    private _parseItemFiles;
    /**
     * Get all items
     * @param options - Options
     * @returns
     */
    getItems(options?: GetAllOptions): Promise<GetAllResult<T>>;
    /**
     * Save item
     * @param item - The next edited item
     * @returns The freshly created item
     */
    saveItem(item: FirestoreEditedItem, options?: SaveItemOptions<T>): Promise<T>;
    /**
     * Update an item
     * @param item - The item to update
     */
    updateItem(item: FirestoreDocument): Promise<void>;
    /**
     * Get an item by its id
     * @param id - Id of the item
     * @returns
     */
    getItem(id: string): Promise<T | null>;
    /**
     * Generate a new model with context
     * @param context - Context to pass to the new model
     * @returns The cloned model with context
     */
    withContext(context: K): FirestoreModel<T, K>;
}
export {};
//# sourceMappingURL=firestoreModel.d.ts.map