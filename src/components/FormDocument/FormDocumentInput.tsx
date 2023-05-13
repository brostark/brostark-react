import { MenuItem } from "@mui/material";
import update from "immutability-helper";
import React, { Fragment, ReactElement, useCallback, useMemo } from "react";
import { FirestoreDocument, FirestoreSchema, FirestoreSchemaFile, FirestoreSchemaObject, FirestoreSchemaReference, FirestoreSchemaReferenceOption, FirestoreSchemaSelect, FirestoreSchemaType, OnChangeEvent } from "../../lib/types";
import { InputAutocompleteAsync } from "../InputAutocompleteAsync/InputAutocompleteAsync";
import { InputFile } from "../InputFile";
import { InputSelect } from "../InputSelect";
import { InputSlider } from "../InputSlider";
import { InputTags } from "../InputTags";
import { InputText } from "../InputText/InputText";
import { RichText } from "../RichText";
import { Spacer } from "../Spacer";
import { DocumentFieldObject } from "./DocumentFieldObject";


interface FormDocumentInputProps<T extends FirestoreDocument> {
  item?: T | null;
  value: unknown;
  spacer?: boolean;
  isLoading?: boolean;
  field: FirestoreSchema;
  onChange: (e: OnChangeEvent<unknown>) => void;
}

export interface RenderFieldOptions {
  item: Record<string, unknown>;
  value: unknown;
}

export const FormDocumentInput = <T extends FirestoreDocument, >({
  field,
  spacer,
  onChange,
  isLoading,
  item: baseItem,
  value: baseValue,
}: FormDocumentInputProps<T>) => {
  const handleChange = useCallback((e: OnChangeEvent<unknown>) => {
    if (field.type === FirestoreSchemaType.object) {
      onChange({
        target: {
          name: field.name,
          value: update((baseValue || {}) as Record<string, unknown>, {
            [e.target.name]: {
              $set: e.target.value,
            },
          }),
        }
      });
      return;
    }

    onChange(e);
  }, [field, baseValue, onChange]);

  const renderField = useCallback((field: FirestoreSchema, options: RenderFieldOptions) => {
    const {
      item,
      value,
    } = options;

    if ((typeof field.visible === "function" && !field.visible(item || {})) || (typeof field.visible === "boolean" && !field.visible)) {
      return <div />;
    }

    switch (field.type) {
      case FirestoreSchemaType.reference: 
        const referenceOptions: FirestoreSchemaReferenceOption = typeof (field as FirestoreSchemaReference).options === "function"
          ? ((field as FirestoreSchemaReference).options as ((item: any) => FirestoreSchemaReferenceOption))(item)
          : (field as FirestoreSchemaReference).options as FirestoreSchemaReferenceOption;

        return (
          <InputAutocompleteAsync
            margin
            fullWidth
            name={field.name}
            label={field.label}
            onChange={handleChange}
            isLoading={isLoading}
            value={value as string}
            {...referenceOptions.props}
          />
        );

      case FirestoreSchemaType.file:
        return (
          <InputFile
            name={field.name}
            label={field.label}
            onChange={handleChange}
            disabled={isLoading}
            value={value as (string | string[])}
            {...(field as FirestoreSchemaFile).options}
          />
        );

      case FirestoreSchemaType.select:
        return (
          <InputSelect
            name={field.name}
            label={field.label}
            isLoading={isLoading}
            onChange={handleChange}
            value={value as (string | string[])}
            children={(field as FirestoreSchemaSelect).options.map((option) => (
              <MenuItem key={`${field.name}-key-${option.key}`} value={option.key}>{option.label}</MenuItem>
            ))}
          />
        );

      case FirestoreSchemaType.tags:
        return (
          <InputTags
            name={field.name}
            label={field.label}
            isLoading={isLoading}
            onChange={handleChange}
            value={value as string[]}
          />
        );

      case FirestoreSchemaType.slider:
        return (
          <InputSlider
            name={field.name}
            label={field.label}
            isLoading={isLoading}
            onChange={handleChange}
            value={value as number || 0}
          />
        );

      case FirestoreSchemaType.object:
        const currentItem = (value || {}) as Record<string, unknown>;

        return (
          <DocumentFieldObject label={field.label}>
            {(field as FirestoreSchemaObject).children.map((childField, index) => {
              return (
                <Fragment key={`schema-${field.name}-${childField.name}`}>
                  {index > 0 && <Spacer />}
                  {renderField(childField, {
                    item: currentItem,
                    value: currentItem[childField.name],
                  })}
                </Fragment>
              );
            })}
          </DocumentFieldObject>
        );

      case FirestoreSchemaType.richText:
        return (
          <RichText
            name={field.name}
            label={field.label}
            disabled={isLoading}
            onChange={handleChange}
            value={value as string}
          />
        );

      default: return (
        <InputText
          fullWidth
          name={field.name}
          label={field.label}
          isLoading={isLoading}
          onChange={handleChange}
          value={value as string}
          type={field.type as FirestoreSchemaType.text | FirestoreSchemaType.number}
        />
      )
    }
  }, [isLoading, handleChange]);

  const input = useMemo((): ReactElement => {
    return renderField(field, {
      value: baseValue,
      item: baseItem as Record<string, unknown>,
    });
  }, [field, renderField, baseValue, baseItem]);

  return (
    <>
      {spacer && <Spacer />}
      {input}
    </>
  );
}
