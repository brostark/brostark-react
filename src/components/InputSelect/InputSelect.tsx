import { Chip, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select as MuiSelect, SelectChangeEvent, Typography } from "@mui/material";
import React, { ReactNode, SyntheticEvent, useCallback } from "react";
import { SpacingValue, useSpacing } from "../../hooks";
import { OnChangeEvent } from "../../lib";
import { styles } from "./inputSelect.styles";


export interface InputSelectProps<T = string> {
  name?: string;
  label?: string;
  value: T | T[];
  disabled?: boolean;
  errorText?: string;
  mulitple?: boolean;
  isLoading?: boolean;
  children?: ReactNode;
  spacing?: SpacingValue;
  disableDefault?: boolean;
  onChange: (e: OnChangeEvent<string | string[]>) => void;
  renderMultipleLabel?: (value: unknown | string) => string;
}


export const InputSelect: React.FC<InputSelectProps> = ({
  name,
  label,
  value,
  spacing,
  mulitple,
  children,
  onChange,
  disabled,
  errorText,
  isLoading,
  disableDefault,
  renderMultipleLabel,
}) => {
  const styleWithSpacing = useSpacing(spacing);

  const createOnDeleteHandler = useCallback((valueToDelete: unknown) => (e: SyntheticEvent) => {
    if (Array.isArray(value)) {
      e.stopPropagation();

      const nextValue = value.filter(x => x !== valueToDelete);

      onChange({
        target: {
          name: name || "",
          value: nextValue,
        }
      });
    }
  }, [name, value, onChange]);

  const renderMultipleValues = useCallback((selected: unknown) => {
    const values = (selected as unknown[]).filter(x => x);

    return (
      <Grid
        container
        alignItems="center"
      >
        {values.map((currentValue) => {
          const handleDelete = createOnDeleteHandler(currentValue);

          return (
            <Chip
              key={`${name}-${currentValue}`}
              onClick={handleDelete}
              onDelete={handleDelete}
              label={renderMultipleLabel ? renderMultipleLabel(currentValue) : currentValue as string}
            />
          )
        })}
      </Grid>
    )
  }, [createOnDeleteHandler, name, renderMultipleLabel]);

  return (
    <>
      <FormControl
        fullWidth
        variant="outlined"
        style={styleWithSpacing}
      >
        <InputLabel shrink htmlFor="outlined-age-simple">{label}</InputLabel>

        <MuiSelect
          fullWidth
          displayEmpty
          name={name}
          value={value}
          label={label}
          defaultValue=""
          css={styles.root}
          variant="outlined"
          disabled={isLoading || disabled}
          renderValue={mulitple ? renderMultipleValues : undefined}
          onChange={onChange as ((e: SelectChangeEvent<string | string[]>) => void)}
          input={
            <OutlinedInput
              notched
              label={label}
              id="outlined-age-simple"
            />
          }
        >
          <MenuItem value="" disabled={disableDefault}>{label}</MenuItem>
          {children}
        </MuiSelect>
      </FormControl>

      {errorText && <Typography color="error">{errorText}</Typography>}
    </>
  )
}