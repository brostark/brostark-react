import React from "react";
import { FirebaseStorageOptions, FirestoreDocument, InputOption } from "..";
import { FileAccept } from "../../components/InputFile/inputFile.helpers";
import { FirestoreModel } from "../firestoreModel";

export enum FirestoreSchemaType {
  text = "text",
  date = "date",
  email = "email",
  password = "password",
  number = "number",
  phone = "phone",
  tags = "tags",
  arrayText = "arrayText",
  file = "file",
  custom = "custom",
  richText = "richText",
  boolean = "boolean",
  checkbox = "checkbox",
  select = "select",
  object = "object",
  slider = "slider",
  reference = "reference",
}


interface FirestoreSchemaBase {
  name: string;
  default?: ((item: any) => any) | any;
  label?: string;
  optional?: boolean;
  placeholder?: string;
  visible?: ((item: any) => boolean) | boolean;
  getValue?: (item: any) => any;
  helper?: React.ReactNode;
}

interface FirestoreSchemaFileOptions extends FirebaseStorageOptions {
  single?: boolean;
  accept?: FileAccept | FileAccept[];
}

export interface FirestoreSchemaDefault extends FirestoreSchemaBase {
  type: Omit<FirestoreSchemaType, "text" | "file" | "select" | "object" | "custom">;
}

export interface FirestoreSchemaCustom extends FirestoreSchemaBase {
  type: FirestoreSchemaType.custom;
  component: React.ReactNode;
}

export interface FirestoreSchemaFile extends FirestoreSchemaBase {
  type: FirestoreSchemaType.file;
  options: FirestoreSchemaFileOptions
}

export interface FirestoreSchemaSelect extends FirestoreSchemaBase {
  type: FirestoreSchemaType.select;
  options: InputOption[];
}

export interface FirestoreSchemaObject extends FirestoreSchemaBase {
  type: FirestoreSchemaType.object;
  children: FirestoreSchema[];
}

export interface FirestoreSchemaText extends FirestoreSchemaBase {
  type: FirestoreSchemaType.text;
  options?: {
    type?: string;
    multiline?: boolean;
    rows?: number;
    subText?: string;
    autoComplete?: boolean;
    options?: string[];
  };
}

export interface FirestoreSchemaNumber extends FirestoreSchemaBase {
  type: FirestoreSchemaType.number,
  options?: {
    min?: number;
    max?: number;
  }
}

export interface FirestoreSchemaSlider extends FirestoreSchemaBase {
  type: FirestoreSchemaType.slider,
  options?: {
    min?: number;
    max?: number;
  }
}

export class FirestoreSchemaReferenceOption<T extends FirestoreDocument = FirestoreDocument> {
  constructor(public props: {
    model: FirestoreModel<T>,
    getDocumentLabel: (item: T) => string,
    noOptionsText?: string,
  }) {}
}

export interface FirestoreSchemaReference extends FirestoreSchemaBase {
  type: FirestoreSchemaType.reference,
  options: FirestoreSchemaReferenceOption<any> | ((item: any) => FirestoreSchemaReferenceOption<any>),
}

export type FirestoreSchema = FirestoreSchemaDefault
  | FirestoreSchemaCustom
  | FirestoreSchemaFile
  | FirestoreSchemaObject
  | FirestoreSchemaSelect
  | FirestoreSchemaText
  | FirestoreSchemaNumber
  | FirestoreSchemaReference;