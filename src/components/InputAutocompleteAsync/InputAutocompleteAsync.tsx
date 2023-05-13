import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { conditionalCss } from "../../helpers/utils";
import { FirestoreModel } from "../../lib/firestoreModel";
import { GetAllResult } from "../../lib/firestoreService";
import { FirestoreDocument, InputOption, OnChangeEvent } from "../../lib/types";
import { styles } from "./inputAutocompleteAsync.styles";

interface InputAutocompleteAsyncProps<T extends FirestoreDocument> {
  model: FirestoreModel<T>;
  margin?: boolean;
  fullWidth?: boolean;
  label?: string;
  name: string;
  value?: string;
  isLoading?: boolean;
  noOptionsText?: string;
  onChange: (e: OnChangeEvent) => void;
  getDocumentLabel: (item: T) => string;
}

export const InputAutocompleteAsync = <T extends FirestoreDocument, >({
  model,
  name,
  label,
  value,
  margin,
  onChange,
  fullWidth,
  noOptionsText,
  getDocumentLabel,
  isLoading: parentIsLoading,
}: InputAutocompleteAsyncProps<T>) => {
  const [options, setOptions] = useState<InputOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = async () => {
    setIsLoading(true);

    try {
      const getAllResult: GetAllResult<T> = await model.getItems();

      setOptions(getAllResult.items.map((item: T) => ({
        key: item.id,
        label: getDocumentLabel(item),
      })));
    } catch (err) {
      console.error(err);
    }

    setIsLoading(false);
  }

  const handleChange = (event: unknown, nextValue: InputOption | null) => {
    onChange({
      target: {
        name,
        value: nextValue ? nextValue.key : "",
      },
    });
  }

  useEffect(() => {
    handleRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Autocomplete
      options={options}
      loading={isLoading}
      fullWidth={fullWidth}
      onChange={handleChange}
      disabled={parentIsLoading}
      noOptionsText={noOptionsText}
      css={[conditionalCss(margin, styles.margin), conditionalCss(fullWidth, styles.fullWidth)]}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          label={label}
          fullWidth={fullWidth}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            disabled: parentIsLoading,
            endAdornment: (
              <>
                {isLoading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
    />
  )
}