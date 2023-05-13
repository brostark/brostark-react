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
import * as uuid from "uuid";
const blobs = {};
/**
 * Save blob as url
 * @param blob - The blob to save
 * @returns
 */
export const saveBlob = (blob) => {
    const url = window.URL.createObjectURL(blob);
    blobs[url] = blob;
    return url;
};
/**
 * Get a blob by its url
 * @param url
 * @returns
 */
export const getBlob = (url) => {
    if (typeof url !== "string") {
        return undefined;
    }
    return blobs[url];
};
/**
 * Check if url is blob
 * @param url - The url
 * @returns
 */
export const isBlob = (url) => {
    if (typeof url !== "string") {
        return false;
    }
    return url.startsWith("blob:") || !!blobs[url];
};
/**
 * Remove blob by its url
 * @param url
 */
export const removeBlob = (url) => {
    window.URL.revokeObjectURL(url);
    delete blobs[url];
};
export const uploadBlob = (blobUrl, options) => __awaiter(void 0, void 0, void 0, function* () {
    if (!isBlob(blobUrl)) {
        return blobUrl;
    }
    const blob = getBlob(blobUrl);
    if (!blob) {
        return undefined;
    }
    return storage.put(blob, options);
});
export const storage = {
    /**
     * Get the public URL of the storage filepath
     * @param filepath - The filepath
     * @returns
     */
    get: (filepath) => __awaiter(void 0, void 0, void 0, function* () {
        if (!filepath) {
            return "";
        }
        try {
            const url = yield firebase.storage().ref().child(filepath).getDownloadURL();
            return url;
        }
        catch (err) {
            return filepath;
        }
    }),
    /**
     * Save a file to firebase storage
     * @param filepath - The file path
     * @param file - The file to save
     * @param options - Options to put to the storage
     * @returns
     */
    put: (file, options) => __awaiter(void 0, void 0, void 0, function* () {
        const path = `${options.folder}/${uuid.v4()}.${file.type.split("/").pop()}`;
        const task = yield firebase.storage().ref().child(path).put(file, {
            contentType: file.type,
            customMetadata: options.metadatas,
        });
        return options.public ? storage.get(task.metadata.fullPath) : path;
    })
};
