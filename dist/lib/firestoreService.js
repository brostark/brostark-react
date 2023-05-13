var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Get all data
 * @param {*} ref - The ref document
 * @param {*} options - Options to filter
 * @returns {Array<*>} Array of items
 */
const getAll = (ref, options = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const { endAt, where, startAt, endBefore, limit = 20, startAfter, direction = "desc", orderBy = "createdAt", } = options;
    let query = ref;
    if (Array.isArray(where) && where.length === 3) {
        query = query.where(where[0], where[1], where[2]);
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
    }
    else if (endBefore) {
        query = query.endAt(endBefore);
    }
    const snapshots = yield query.limit(limit + 1).get();
    let result = snapshots.docs.map((doc) => doc.data());
    result = result.filter(x => x);
    const hasPrevious = !!startAfter;
    const items = result.slice(0, limit);
    const hasMore = result.length > limit;
    return {
        items,
        hasMore,
        hasPrevious,
        endBefore: hasPrevious ? items[0][orderBy] : "",
        startAfter: hasMore ? items[items.length - 1][orderBy] : "",
    };
});
/**
 * Get one document
 * @param {*} ref - The ref document
 * @param {*} options - Options to filter
 * @returns {*} The item
 */
const get = (ref) => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield ref.get();
    if (snapshot.exists) {
        const result = snapshot.data();
        return result;
    }
    return null;
});
/**
 * Edit a document
 * @param {*} ref - The ref document
 * @param {*} values - Values to update
 * @param {*} options - Options for edition
 * @returns {*} The item
 */
const edit = (ref, values = {}) => __awaiter(void 0, void 0, void 0, function* () {
    yield ref.update(Object.assign(Object.assign({}, values), { updated_at: new Date() }));
    return get(ref);
});
const computeCrudEntry = (ref, values = {}) => {
    if (!values.id) {
        values.id = ref.id;
    }
    if (!values.createdAt) {
        values.createdAt = new Date();
    }
    values.updatedAt = new Date();
};
const update = (ref, values = {}) => __awaiter(void 0, void 0, void 0, function* () {
    computeCrudEntry(ref, values);
    yield ref.update(values);
    return values;
});
/**
 * Set a document
 * @param ref - The ref document
 * @param values - The values of the document
 */
const set = (ref, values = {}) => __awaiter(void 0, void 0, void 0, function* () {
    computeCrudEntry(ref, values);
    yield ref.set(values);
    return values;
});
/**
 * Execute a buk operation
 * @param db - The database
 * @param actions - List of actions
 * @returns Promise
 */
export const bulkActions = (db, actions) => __awaiter(void 0, void 0, void 0, function* () {
    const maxOperation = 400;
    do {
        const batch = db.batch();
        const currentActions = actions.slice(0, maxOperation);
        currentActions.forEach((action) => {
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
        yield batch.commit();
        actions.splice(0, maxOperation);
    } while (actions.length > 0);
});
export const crud = {
    get,
    set,
    edit,
    update,
    getAll,
};
