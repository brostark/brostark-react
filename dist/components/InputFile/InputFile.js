import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { AddPhotoAlternateOutlined, Delete } from "@mui/icons-material";
import { Fab, Typography } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { conditionalCss } from "../../helpers";
import { getBlob, removeBlob, saveBlob } from "../../lib";
import { Fieldset } from "../Fieldset/Fieldset";
import { Spacer } from "../Spacer";
import { fileAcceptToDropzoneAccept } from "./inputFile.helpers";
import { styles } from "./inputFile.styles";
export const InputFile = ({ icon, name, label, value, accept, single, spacing, onChange, disabled, displayMedias = true, placeholder = "Cliquez ici ou glissez directement les fichiers à cet endroit", }) => {
    const IconComponent = useMemo(() => {
        return icon ? icon : AddPhotoAlternateOutlined;
    }, [icon]);
    const createOnRemoveFileHandler = (index) => (e) => {
        if (index < 0) {
            return;
        }
        e.stopPropagation();
        const nextFileDatas = Array.isArray(value) ? value.filter((file, i) => i !== index) : "";
        if (onChange) {
            onChange({
                target: {
                    name,
                    value: nextFileDatas
                }
            });
        }
    };
    const arrayValue = useMemo(() => {
        return value ? [].concat(value) : [];
    }, [value]);
    const onDrop = useCallback((acceptedFiles) => {
        arrayValue.forEach(removeBlob);
        const nextValue = acceptedFiles.map((file) => {
            const blobUrlExists = arrayValue.find((blobUrl) => getBlob(blobUrl) === file);
            return blobUrlExists || saveBlob(file);
        });
        if (onChange) {
            onChange({
                target: {
                    name,
                    value: single ? nextValue[0] || "" : nextValue,
                }
            });
        }
        arrayValue.forEach((blobUrl) => {
            const nextBlobUrlExists = nextValue.find((nextBlobUrl) => nextBlobUrl === blobUrl);
            if (!nextBlobUrlExists) {
                removeBlob(blobUrl);
            }
        });
    }, [onChange, arrayValue, name, single]);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        disabled,
        multiple: !single,
        accept: fileAcceptToDropzoneAccept(accept),
    });
    return (_jsx(Fieldset, Object.assign({ label: label, spacing: spacing, css: [styles.root, conditionalCss(!!label, styles.rootWithLabel)] }, { children: _jsxs("div", Object.assign({}, getRootProps(), { css: styles.content }, { children: [_jsx("input", Object.assign({ name: name }, getInputProps())), _jsx("div", Object.assign({ css: [styles.blobs, conditionalCss(single && arrayValue.length > 0, styles.blobsSingle)] }, { children: displayMedias && arrayValue.map(((blobUrl, index) => (_jsx("div", Object.assign({ css: styles.blob, style: { backgroundImage: `url(${blobUrl})` } }, { children: _jsx(Fab, Object.assign({ size: "small", color: "primary", css: styles.blobIcon, onClick: createOnRemoveFileHandler(index) }, { children: _jsx(Delete, {}) })) }), blobUrl)))) })), (!single || (single && arrayValue.length <= 0)) && (_jsxs(_Fragment, { children: [_jsx(IconComponent, { color: "primary", css: styles.addIcon }), _jsx(Spacer, {}), _jsx(Typography, { children: placeholder })] }))] })) })));
};
