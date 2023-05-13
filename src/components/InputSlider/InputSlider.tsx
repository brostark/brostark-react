import { Slider, Stack, Typography } from "@mui/material";
import React from "react";
import { SpacingValue, useSpacing } from "../../hooks";
import { OnChangeEvent } from "../../lib";
import { Fieldset } from "../Fieldset";


export interface InputSliderProps {
  min?: number;
  max?: number;
  name: string;
  value: number;
  label?: string;
  disabled?: boolean;
  isLoading?: boolean;
  spacing?: SpacingValue;
  onChange: (e: OnChangeEvent<number>) => void;
}


export const InputSlider: React.FC<InputSliderProps> = ({
  name,
  label,
  value,
  spacing,
  min = 0,
  max = 100,
  onChange,
  disabled,
  isLoading,
}) => {
  const styleWithSpacing = useSpacing(spacing);

  const handleChange = (e: Event, value: number | number[]) => onChange({
    target: {
      name,
      value: Array.isArray(value) ? value[0] : value,
    }
  });

  return (
    <Fieldset label={label} style={styleWithSpacing}>
      <Stack spacing={2} direction="row">
        <Typography>{min}</Typography>

        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          disabled={isLoading || disabled}
        />

        <Typography>{max}</Typography>
      </Stack>
    </Fieldset>
  )
}