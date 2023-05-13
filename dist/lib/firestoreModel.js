var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import firebase from "firebase/app";
import { uploadBlob } from "./firebaseStorage";
import { crud } from "./firestoreService";
import { FirestoreSchemaType } from "./types";
export class FirestoreModel {
    /* LIFECYCLE */
    /**
     * @constructor
     * @param _attributes
     */
    constructor(settings, context) {
        this.context = context;
        this.schema = settings.schema;
        this.getQuery = settings.getQuery;
        this.onGetItem = settings.onGetItem;
        this.getAllOptions = settings.getAllOptions;
        this.onGetListItem = settings.onGetListItem;
        this.getReferenceCollection = settings.getReferenceCollection;
        this.getReferenceInfoCollection = settings.getReferenceInfoCollection;
    }
    /* PRIVATE */
    /**
     * Parse Item file to upload it before saving it
     * @param item - The item to parse
     * @param fileOption - Option of the file
     */
    _parseItemFiles(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const schemaFiles = this.schema.filter((value) => value.type === FirestoreSchemaType.file);
            yield Promise.all(schemaFiles.map((schemaFile) => __awaiter(this, void 0, void 0, function* () {
                const fileUrl = item[schemaFile.name];
                if (fileUrl) {
                    item[schemaFile.name] = yield uploadBlob(fileUrl, schemaFile.options);
                }
            })));
        });
    }
    /* PUBLIC */
    /**
     * Get all items
     * @param options - Options
     * @returns
     */
    getItems(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.getReferenceCollection && !this.getQuery) {
                throw new Error("[Model] getReferenceCollection or getQuery required");
            }
            const db = firebase.firestore();
            const ref = this.getReferenceCollection ? this.getReferenceCollection(db, this.context) : this.getQuery && this.getQuery(db);
            let result = yield crud.getAll(ref, Object.assign(Object.assign({}, options), (this.getAllOptions || {})));
            if (this.onGetListItem) {
                result = yield this.onGetListItem(result);
            }
            return result;
        });
    }
    /**
     * Save item
     * @param item - The next edited item
     * @returns The freshly created item
     */
    saveItem(item, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = firebase.firestore();
            const ref = this.getReferenceCollection(db, this.context).doc(item.id);
            if (!item.id) {
                item.id = ref.id;
            }
            yield Promise.all([
                this._parseItemFiles(item),
            ]);
            item.createdAt = item.createdAt || firebase.firestore.Timestamp.now();
            item.updatedAt = firebase.firestore.Timestamp.now();
            yield ref.set(item);
            return item;
        });
    }
    /**
     * Update an item
     * @param item - The item to update
     */
    updateItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = firebase.firestore();
            const ref = this.getReferenceCollection(db, this.context).doc(item.id);
            yield Promise.all([
                this._parseItemFiles(item),
            ]);
            yield ref.update(Object.assign(Object.assign({}, item), { updatedAt: firebase.firestore.Timestamp.now() }));
        });
    }
    /**
     * Get an item by its id
     * @param id - Id of the item
     * @returns
     */
    getItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.getReferenceCollection) {
                return null;
            }
            const db = firebase.firestore();
            const nextItem = yield crud.get(this.getReferenceCollection(db, this.context).doc(id));
            if (this.onGetItem && nextItem) {
                return this.onGetItem(nextItem);
            }
            return nextItem;
        });
    }
    /**
     * Generate a new model with context
     * @param context - Context to pass to the new model
     * @returns The cloned model with context
     */
    withContext(context) {
        return new FirestoreModel({
            schema: this.schema,
            getAllOptions: this.getAllOptions,
            onGetItem: this.onGetItem,
            onGetListItem: this.onGetListItem,
            getQuery: this.getQuery,
            getCollectionGroup: this.getCollectionGroup,
            getReferenceCollection: this.getReferenceCollection,
        }, context);
    }
}
