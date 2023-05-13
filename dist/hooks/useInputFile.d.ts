import { RefObject } from "react";
export interface UseInputFileResult {
    file?: File;
    blobUrl?: string;
    open: () => void;
    ref: RefObject<HTMLInputElement>;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}
export interface InputFileData {
    file?: File;
    blobUrl: string;
}
export declare const useInputFile: (onFileChange?: (data: InputFileData) => void) => UseInputFileResult;
//# sourceMappingURL=useInputFile.d.ts.map