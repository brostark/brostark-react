import firebase from "firebase/app";
import * as uuid from "uuid";


export interface IBlobs {
  [key: string]: Blob;
}


const blobs: IBlobs = {};


/**
 * Save blob as url
 * @param blob - The blob to save
 * @returns 
 */
export const saveBlob = (blob: Blob): string => {
  const url: string = window.URL.createObjectURL(blob);

  blobs[url] = blob;
  return url;
}


/**
 * Get a blob by its url
 * @param url 
 * @returns 
 */
export const getBlob = (url: string | undefined): Blob | undefined => {
  if (typeof url !== "string") {
    return undefined;
  }

  return blobs[url];
}

/**
 * Check if url is blob
 * @param url - The url
 * @returns 
 */
export const isBlob = (url: string | undefined): boolean => {
  if (typeof url !== "string") {
    return false;
  }

  return url.startsWith("blob:") || !!blobs[url];
}


/**
 * Remove blob by its url
 * @param url 
 */
export const removeBlob = (url: string): void => {
  window.URL.revokeObjectURL(url);

  delete blobs[url];
}


export interface FirebaseStorageOptions {
  folder: string;
  metadatas?: any;
  public?: boolean;
}

export const uploadBlob = async (blobUrl: string | undefined, options: FirebaseStorageOptions): Promise<string | undefined> => {
  if (!isBlob(blobUrl)) {
    return blobUrl;
  }

  const blob = getBlob(blobUrl);

  if (!blob) {
    return undefined;
  }

  return storage.put(blob, options);
}

export const storage = {
  /**
   * Get the public URL of the storage filepath
   * @param filepath - The filepath
   * @returns 
   */
  get: async (filepath?: string): Promise<string> => {
    if (!filepath) {
      return "";
    }

    try {
      const url = await firebase.storage().ref().child(filepath).getDownloadURL();

      return url;
    } catch (err) {
      return filepath;
    }
  },

  /**
   * Save a file to firebase storage
   * @param filepath - The file path
   * @param file - The file to save
   * @param options - Options to put to the storage
   * @returns 
   */
  put: async (file: Blob | File, options: FirebaseStorageOptions): Promise<string> => {
    const path = `${options.folder}/${uuid.v4()}.${file.type.split("/").pop()}`;
    const task = await firebase.storage().ref().child(path).put(file, {
      contentType: file.type,
      customMetadata: options.metadatas,
    });

    return options.public ? storage.get(task.metadata.fullPath) : path;
  }
}
