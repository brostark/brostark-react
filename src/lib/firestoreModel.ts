import firebase from "firebase/app";
import { FirestoreEditedItem } from "../components/FormDocument/FormDocument";
import { FirebaseStorageOptions, uploadBlob } from "./firebaseStorage";
import { GetAllOptions, GetAllResult, crud } from "./firestoreService";
import { FirestoreDocument, FirestoreSchema, FirestoreSchemaFile, FirestoreSchemaType } from "./types";


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
}

interface SaveItemOptions<T extends FirestoreDocument> {
  files?: SaveItemFile<T>;
}


export class FirestoreModel<T extends FirestoreDocument = FirestoreDocument, K = undefined> {
  /* ATTRIBUTES */

  /**
   * Called when retrieving data from firebase;
   */
  private onGetItem?: (data: any) => Promise<T>;

  /**
   * Called when retrieving data from firebase (on list)
   */
  private onGetListItem?: (data: GetAllResult<T>) => Promise<GetAllResult<T>>;

  /**
   * Get query from firebase
   */
  public getQuery?: (db: firebase.firestore.Firestore, context?: K) => firebase.firestore.Query;

  /**
   * Get collection group
   */
  public getCollectionGroup?: (db: firebase.firestore.Firestore, context?: K) => firebase.firestore.Query;

  /**
   * Get info about reference
   */
  getReferenceInfoCollection?: (db: firebase.firestore.Firestore, context?: K) => firebase.firestore.DocumentReference;

  /**
   * Get collection from document
   */
  public getReferenceCollection?: (db: firebase.firestore.Firestore, context?: K) => firebase.firestore.CollectionReference;

  /**
   * Options to pass to getAll by default
   */
  public getAllOptions?: GetAllOptions;

  /**
   * The schema for the form
   */
  public schema: FirestoreSchema[];


  /* LIFECYCLE */

  /**
   * @constructor
   * @param _attributes 
   */
  public constructor(settings: FirestoreModelSettings<T, K>, public context?: K) {
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
  private async _parseItemFiles(item: FirestoreEditedItem) {
    const schemaFiles = this.schema.filter((value) => value.type === FirestoreSchemaType.file) as FirestoreSchemaFile[];

    await Promise.all(schemaFiles.map(async (schemaFile: FirestoreSchemaFile) => {
      const fileUrl = item[schemaFile.name] as string;

      if (fileUrl) {
        item[schemaFile.name] = await uploadBlob(fileUrl, schemaFile.options);
      }
    }));
  }


  /* PUBLIC */

  /**
   * Get all items
   * @param options - Options
   * @returns 
   */
  public async getItems(options: GetAllOptions = {}): Promise<GetAllResult<T>> {
    if (!this.getReferenceCollection && !this.getQuery) {
      throw new Error("[Model] getReferenceCollection or getQuery required");
    }

    const db: firebase.firestore.Firestore = firebase.firestore();
    const ref: any = this.getReferenceCollection ? this.getReferenceCollection(db, this.context) : this.getQuery && this.getQuery(db);
    let result: GetAllResult<T> = await crud.getAll<T>(ref, {
      ...options,
      ...(this.getAllOptions || {}),
    });

    if (this.onGetListItem) {
      result = await this.onGetListItem(result);
    }

    return result;
  }

  /**
   * Save item
   * @param item - The next edited item
   * @returns The freshly created item
   */
  public async saveItem(item: FirestoreEditedItem, options: SaveItemOptions<T> = {}): Promise<T> {
    const db: firebase.firestore.Firestore = firebase.firestore();
    const ref: firebase.firestore.DocumentReference = this.getReferenceCollection!(db, this.context).doc(item.id);

    if (!item.id) {
      item.id = ref.id;
    }

    await Promise.all([
      this._parseItemFiles(item),
    ]);

    item.createdAt = item.createdAt || firebase.firestore.Timestamp.now();
    item.updatedAt = firebase.firestore.Timestamp.now();

    await ref.set(item);

    return item as T;
  }

  /**
   * Update an item
   * @param item - The item to update
   */
  public async updateItem(item: FirestoreDocument): Promise<void> {
    const db: firebase.firestore.Firestore = firebase.firestore();
    const ref: firebase.firestore.DocumentReference = this.getReferenceCollection!(db, this.context).doc(item.id);

    await Promise.all([
      this._parseItemFiles(item),
    ]);

    await ref.update({
      ...item,
      updatedAt: firebase.firestore.Timestamp.now(),
    });
  }

  /**
   * Get an item by its id
   * @param id - Id of the item
   * @returns 
   */
  public async getItem(id: string): Promise<T | null> {
    if (!this.getReferenceCollection) {
      return null;
    }

    const db = firebase.firestore();
    const nextItem = await crud.get<T>(this.getReferenceCollection(db, this.context).doc(id));

    if (this.onGetItem && nextItem) {
      return this.onGetItem(nextItem);
    }

    return nextItem;
  }

  /**
   * Generate a new model with context
   * @param context - Context to pass to the new model
   * @returns The cloned model with context
   */
  public withContext(context: K): FirestoreModel<T, K> {
    return new FirestoreModel<T, K>({
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