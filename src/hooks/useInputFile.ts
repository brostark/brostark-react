import { RefObject, useRef, useState } from "react";


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


export const useInputFile = (onFileChange?: (data: InputFileData) => void): UseInputFileResult => {
  const ref = useRef<HTMLInputElement>(null);
  const [fileData, setFileData] = useState<InputFileData | null>(null)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files![0] || undefined;
    const nextFileData: InputFileData = {
      file,
      blobUrl: file ? window.URL.createObjectURL(file) : "",
    }

    setFileData(nextFileData);

    if (onFileChange) {
      onFileChange(nextFileData);
    }
  }

  const open = () => ref.current?.click();

  return {
    ref,
    open,
    onChange,
    ...fileData,
  };
};