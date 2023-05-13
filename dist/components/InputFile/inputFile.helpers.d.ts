import { Accept } from "react-dropzone";
export declare enum FileAccept {
    Images = "images",
    Audios = "audios",
    Videos = "videos",
    Csv = "csv",
    Gif = "gif",
    Pdf = "pdf"
}
/**
 * Convert a fileAccept enum to Accept object for Dropzone
 * @param accepts - List of accepts
 */
export declare const fileAcceptToDropzoneAccept: (accept?: FileAccept | FileAccept[]) => Accept;
//# sourceMappingURL=inputFile.helpers.d.ts.map