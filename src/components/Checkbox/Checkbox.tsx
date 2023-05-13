import React from "react";
import { FormControlLabel, Checkbox as MuiCheckbox, CheckboxProps as MuiCheckboxProps } from "@mui/material";


interface CheckboxProps extends MuiCheckboxProps {
  label?: string;
  labelProps?: any;
  margin?: boolean;
  className?: string;
  color?: "primary" | "secondary";
}


export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className,
  labelProps,
  margin = false,
  color = "primary",
  ...props
}) => {
  return (
    <FormControlLabel
      label={label}
      control={<MuiCheckbox {...props} color={color} />}
      {...labelProps}
    />
  );
}
