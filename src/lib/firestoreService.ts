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


/**
 * Get all data
 * @param {*} ref - The ref document
 * @param {*} options - Options to filter
 * @returns {Array<*>} Array of items
 */
const getAll = async <T extends FirestoreDocument = FirestoreDocument>(ref: firebase.firestore.CollectionReference | firebase.firestore.Query, options: GetAllOptions = {}): Promise<GetAllResult<T>> => {
  const {
    endAt,
    where,
    startAt,
    endBefore,
    limit = 20,
    startAfter,
    direction = "desc",
    orderBy = "createdAt",
  } = options
  let query: firebase.firestore.Query | firebase.firestore.Query = ref;

  if (Array.isArray(where) && where.length === 3) {
    query = query.where(where[0] as string, where[1] as firebase.firestore.WhereFilterOp, where[2]);
  }

  if (startAt) {
    query = query.where(orderBy, ">", startAt);
  }

  if (endAt) {
    query = query.where(orderBy, "<", endAt);
  }

  if (orderBy) {
    query = query.orderBy(orderBy, direction);
  }

  if (startAfter) {
    query = query.startAfter(startAfter);
  } else if (endBefore) {
    query = query.endAt(endBefore);
  }

  const snapshots: firebase.firestore.QuerySnapshot = await query.limit(limit + 1).get();

  let result: T[] = snapshots.docs.map((doc) => doc.data()) as T[];

  result = result.filter(x => x);

  const hasPrevious = !!startAfter;
  const items = result.slice(0, limit);
  const hasMore = result.length > limit;

  return {
    items,
    hasMore,
    hasPrevious,
    endBefore: hasPrevious ? items[0][orderBy] as string : "",
    startAfter: hasMore ? items[items.length - 1][orderBy] as string : "",
  }
}


/**
 * Get one document
 * @param {*} ref - The ref document
 * @param {*} options - Options to filter
 * @returns {*} The item
 */
const get = async <T>(ref: firebase.firestore.DocumentReference): Promise<T | null> => {
  const snapshot: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> = await ref.get();

  if (snapshot.exists) {
    const result = snapshot.data() as firebase.firestore.DocumentData as unknown;

    return result as T;
  }

  return null;
}


export interface ICrudEntry {
  [key: string]: any;
}

/**
 * Edit a document
 * @param {*} ref - The ref document
 * @param {*} values - Values to update
 * @param {*} options - Options for edition
 * @returns {*} The item
 */
const edit = async (ref: firebase.firestore.DocumentReference, values: ICrudEntry = {}): Promise<FirestoreDocument | null> => {
  await ref.update({
    ...values,
    updated_at: new Date(),
  });

  return get(ref);
}


const computeCrudEntry = (ref: firebase.firestore.DocumentReference, values: ICrudEntry = {}) => {
  if (!values.id) {
    values.id = ref.id;
  }

  if (!values.createdAt) {
    values.createdAt = new Date();
  }

  values.updatedAt = new Date();
}

const update = async <T>(ref: firebase.firestore.DocumentReference, values: ICrudEntry = {}): Promise<T> => {
  computeCrudEntry(ref, values);
  await ref.update(values);

  return values as T;
};

/**
 * Set a document
 * @param ref - The ref document
 * @param values - The values of the document
 */
const set = async <T>(ref: firebase.firestore.DocumentReference, values: ICrudEntry = {}): Promise<T> => {
  computeCrudEntry(ref, values);
  await ref.set(values);

  return values as T;
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
export const bulkActions = async (db: firebase.firestore.Firestore, actions: BulkAction[]): Promise<void> => {
  const maxOperation: number = 400;

  do {
    const batch: firebase.firestore.WriteBatch = db.batch();
    const currentActions: BulkAction[] = actions.slice(0, maxOperation);

    currentActions.forEach((action: BulkAction) => {
      if (!action.ref) {
        return;
      }

      if (action.action === "update" && action.fields) {
        batch.update(action.ref, action.fields);
        return;
      }

      if (action.action === "set" && action.fields) {
        batch.set(action.ref, action.fields);
        return;
      }

      if (action.action === "delete") {
        batch.delete(action.ref);
      }
    });

    await batch.commit();

    actions.splice(0, maxOperation);
  } while (actions.length > 0);
}


export const crud = {
  get,
  set,
  edit,
  update,
  getAll,
}