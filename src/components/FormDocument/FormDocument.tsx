import { Add } from "@mui/icons-material";
import update from "immutability-helper";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../contexts/appContext";

import { FirestoreDocument, FirestoreSchema, FirestoreSchemaType, OnChangeEvent } from "../../lib/types";
import { ErrorTypography } from "../ErrorTypography/ErrorTypography";
import { isFieldValueValid } from "./formDocument.utils";
import { FormDocumentInput } from "./FormDocumentInput";
import { Button } from "../Button/Button";
import { Spacer } from "../Spacer/Spacer";


export interface FirestoreEditedItem {
  id?: string;
  [key: string]: unknown;
}

interface FormDocumentProps<T> {
  item?: T | null;
  isLoading?: boolean;
  schema: FirestoreSchema[];
  onChange?: (nextItem: FirestoreEditedItem, previousItem?: T | null) => void;
}


export const FormDocument = <T extends FirestoreDocument, >({
  item,
  schema,
  onChange,
  isLoading: parentIsLoading,
}: FormDocumentProps<T>) => {
  const { isLoading } = useContext(AppContext);
  const [itemIsEdited, setItemIsEdited] = useState(false);
  const [editedItem, setEditedItem] = useState<FirestoreEditedItem>({});

  const remainsBeforeSubmitting = useMemo(() => {
    const remains: FirestoreSchema[] = [];

    for (const field of schema) {
      const value = editedItem[field.name];

      if (!field.optional && !isFieldValueValid(field.type as FirestoreSchemaType, value)) {
        remains.push(field);
      }
    }

    return remains;
  }, [editedItem, schema]);

  const onItemAttributeChange = (e: OnChangeEvent<unknown>) => {
    setItemIsEdited(true);
    setEditedItem((previousEditedItem) => update(previousEditedItem, {
      [e.target.name]: {
        $set: e.target.value,
      },
    }));
  }

  const handleSave = () => onChange && onChange(editedItem, item);

  useEffect(() => {
    setItemIsEdited(false);
    setEditedItem(item ? { ...item } : {});
  }, [item]);

  const isLoadingComputed = isLoading || parentIsLoading;

  return (
    <>
      {schema.map((field, index) => {
        const key: string = `schema-${field.name}`;
        const value: unknown = editedItem[field.name];

        return (
          <FormDocumentInput<T>
            key={key}
            field={field}
            value={value}
            spacer={index > 0}
            item={editedItem as T}
            isLoading={isLoadingComputed}
            onChange={onItemAttributeChange}
          />
        );
      })}
      <Spacer spacing={6} />

      <Button
        fullWidth
        color="primary"
        spacing={{ top: 2 }}
        onClick={handleSave}
        isLoading={isLoadingComputed}
        disabled={remainsBeforeSubmitting.length > 0 || !itemIsEdited}
      >
        <Add />
        Enregistrer
      </Button>

      {remainsBeforeSubmitting.length > 0 && (
        <ErrorTypography align="center">
          Les champs suivants sont requis pour sauvegarder: {remainsBeforeSubmitting.map(field => field.label).join(", ")}
        </ErrorTypography>
      )}
    </>
  );
}
