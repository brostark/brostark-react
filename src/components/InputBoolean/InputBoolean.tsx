import { Grid, Switch, Typography } from "@mui/material";
import React from "react";
import { SpacingValue } from "../../hooks";
import { Fieldset } from "../Fieldset";


export interface InputBooleanProps {
  name?: string;
  label?: string;
  value: boolean;
  disabled?: boolean;
  labelFalsy?: string;
  labelTruthy?: string;
  spacing?: SpacingValue;
  onChange: (value: boolean) => void;
}

export const InputBoolean: React.FC<InputBooleanProps> = ({
  name,
  label,
  value,
  spacing,
  disabled,
  onChange,
  labelFalsy,
  labelTruthy,
}) => {
  const handleChange = (e: React.SyntheticEvent, nextValue: boolean) => onChange(nextValue);

  return (
    <Fieldset
      label={label}
      spacing={spacing}
    >
      <Grid
        container
        flexWrap="nowrap"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Typography>{labelFalsy}</Typography>
        <Switch
          name={name}
          checked={!!value}
          disabled={disabled}
          onChange={handleChange}
        />
        <Typography>{labelTruthy}</Typography>
      </Grid>
    </Fieldset>
  );
}
