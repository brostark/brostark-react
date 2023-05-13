import { Accept } from "react-dropzone";


export enum FileAccept {
  Images = "images",
  Audios = "audios",
  Videos = "videos",
  Csv = "csv",
  Gif = "gif",
  Pdf = "pdf",
}


/**
 * Convert a fileAccept enum to Accept object for Dropzone
 * @param accepts - List of accepts
 */
export const fileAcceptToDropzoneAccept = (accept?: FileAccept | FileAccept[]): Accept => {
  const result: Accept = {
    "text/*": [],
    "image/*": [],
    "audio/*": [],
    "video/*": [],
    "application/*": [],
  };

  if (accept) {
    const accepts: FileAccept[] = Array.isArray(accept) ? accept : [accept];
  
    accepts.forEach((currentAccept) => {
      switch (currentAccept) {
        case FileAccept.Images: result["image/*"].push(".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp");
          break;
        case FileAccept.Videos: result["video/*"].push(".mp4", ".mpeg", ".ogv", ".webm");
          break;
        case FileAccept.Csv: result["text/*"].push(".csv");
          break;
        case FileAccept.Gif: result["image/*"].push(".gif");
          break;
        case FileAccept.Pdf: result["application/*"].push(".pdf");
          break;
        case FileAccept.Audios: result["audio/*"].push(".mp3", ".wav", ".ogg", ".webm");
          break;
      }
    });
  }

  Object.keys(result).forEach((key) => {
    if (result[key].length <= 0) {
      delete result[key];
    }
  });

  return result;
}