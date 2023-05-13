import { useRef, useState } from "react";
export const useInputFile = (onFileChange) => {
    const ref = useRef(null);
    const [fileData, setFileData] = useState(null);
    const onChange = (e) => {
        const file = e.target.files[0] || undefined;
        const nextFileData = {
            file,
            blobUrl: file ? window.URL.createObjectURL(file) : "",
        };
        setFileData(nextFileData);
        if (onFileChange) {
            onFileChange(nextFileData);
        }
    };
    const open = () => { var _a; return (_a = ref.current) === null || _a === void 0 ? void 0 : _a.click(); };
    return Object.assign({ ref,
        open,
        onChange }, fileData);
};
