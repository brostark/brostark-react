import { AddPhotoAlternateOutlined, Delete } from "@mui/icons-material";
import { Fab, Typography } from "@mui/material";
import React, { ElementType, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { conditionalCss } from "../../helpers";
import { SpacingValue } from "../../hooks";
import { getBlob, OnChangeEvent, removeBlob, saveBlob } from "../../lib";
import { Fieldset } from "../Fieldset/Fieldset";
import { Spacer } from "../Spacer";
import { FileAccept, fileAcceptToDropzoneAccept } from "./inputFile.helpers";
import { styles } from "./inputFile.styles";


interface InputFileProps {
  name: string;
  label?: string;
  accept?: FileAccept | FileAccept[];
  single?: boolean;
  disabled?: boolean;
  icon?: ElementType;
  placeholder?: string;
  spacing?: SpacingValue;
  displayMedias?: boolean;
  value: string | string[];
  onChange?: (e: OnChangeEvent<string | string[]>) => void;
}


export const InputFile: React.FC<InputFileProps> = ({
  icon,
  name,
  label,
  value,
  accept,
  single,
  spacing,
  onChange,
  disabled,
  displayMedias = true,
  placeholder = "Cliquez ici ou glissez directement les fichiers à cet endroit",
}) => {
  const IconComponent = useMemo(() => {
    return icon ? icon : AddPhotoAlternateOutlined;
  }, [icon]);

  const createOnRemoveFileHandler = (index: number) => (e: React.SyntheticEvent) =>{
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
  }

  const arrayValue = useMemo(() => {
    return value ? ([] as string[]).concat(value) : [];
  }, [value]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
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

  return (
    <Fieldset
      label={label}
      spacing={spacing}
      css={[styles.root, conditionalCss(!!label, styles.rootWithLabel)]}
    >
      <div {...getRootProps()} css={styles.content}>
        <input name={name} {...getInputProps()} />

        <div css={[styles.blobs, conditionalCss(single && arrayValue.length > 0, styles.blobsSingle)]}>
          {displayMedias && arrayValue.map(((blobUrl, index) => (
            <div
              key={blobUrl}
              css={styles.blob}
              style={{ backgroundImage: `url(${blobUrl})`}}
            >
              <Fab
                size="small"
                color="primary"
                css={styles.blobIcon}
                onClick={createOnRemoveFileHandler(index)}
              >
                <Delete />
              </Fab>
            </div>
          )))}
        </div>

        {(!single || (single && arrayValue.length <= 0)) && (
          <>
            <IconComponent color="primary" css={styles.addIcon} />
            <Spacer />
            <Typography>{placeholder}</Typography>
          </>
        )}
      </div>
    </Fieldset>
  )
}