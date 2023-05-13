export interface IBlobs {
    [key: string]: Blob;
}
/**
 * Save blob as url
 * @param blob - The blob to save
 * @returns
 */
export declare const saveBlob: (blob: Blob) => string;
/**
 * Get a blob by its url
 * @param url
 * @returns
 */
export declare const getBlob: (url: string | undefined) => Blob | undefined;
/**
 * Check if url is blob
 * @param url - The url
 * @returns
 */
export declare const isBlob: (url: string | undefined) => boolean;
/**
 * Remove blob by its url
 * @param url
 */
export declare const removeBlob: (url: string) => void;
export interface FirebaseStorageOptions {
    folder: string;
    metadatas?: any;
    public?: boolean;
}
export declare const uploadBlob: (blobUrl: string | undefined, options: FirebaseStorageOptions) => Promise<string | undefined>;
export declare const storage: {
    /**
     * Get the public URL of the storage filepath
     * @param filepath - The filepath
     * @returns
     */
    get: (filepath?: string) => Promise<string>;
    /**
     * Save a file to firebase storage
     * @param filepath - The file path
     * @param file - The file to save
     * @param options - Options to put to the storage
     * @returns
     */
    put: (file: Blob | File, options: FirebaseStorageOptions) => Promise<string>;
};
//# sourceMappingURL=firebaseStorage.d.ts.map