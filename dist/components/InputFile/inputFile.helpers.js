export var FileAccept;
(function (FileAccept) {
    FileAccept["Images"] = "images";
    FileAccept["Audios"] = "audios";
    FileAccept["Videos"] = "videos";
    FileAccept["Csv"] = "csv";
    FileAccept["Gif"] = "gif";
    FileAccept["Pdf"] = "pdf";
})(FileAccept || (FileAccept = {}));
/**
 * Convert a fileAccept enum to Accept object for Dropzone
 * @param accepts - List of accepts
 */
export const fileAcceptToDropzoneAccept = (accept) => {
    const result = {
        "text/*": [],
        "image/*": [],
        "audio/*": [],
        "video/*": [],
        "application/*": [],
    };
    if (accept) {
        const accepts = Array.isArray(accept) ? accept : [accept];
        accepts.forEach((currentAccept) => {
            switch (currentAccept) {
                case FileAccept.Images:
                    result["image/*"].push(".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp");
                    break;
                case FileAccept.Videos:
                    result["video/*"].push(".mp4", ".mpeg", ".ogv", ".webm");
                    break;
                case FileAccept.Csv:
                    result["text/*"].push(".csv");
                    break;
                case FileAccept.Gif:
                    result["image/*"].push(".gif");
                    break;
                case FileAccept.Pdf:
                    result["application/*"].push(".pdf");
                    break;
                case FileAccept.Audios:
                    result["audio/*"].push(".mp3", ".wav", ".ogg", ".webm");
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
};
