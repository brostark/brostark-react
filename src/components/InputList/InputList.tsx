import { List } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { SpacingValue } from "../../hooks";
import { Fieldset } from "../Fieldset";
import { InputListItem } from "./InputListItem";


interface InputListProps {
  name?: string;
  label?: string;
  value: string[];
  disabled?: boolean;
  placeholder?: string;
  spacing?: SpacingValue;
  onChange: (values: string[]) => void;
  inputListItemProps?: (value: string, index: number) => {
    LeftComponent?: React.ReactElement;
  };
}


export const InputList: React.FC<InputListProps> = ({
  name,
  label,
  value,
  spacing,
  onChange,
  disabled,
  placeholder,
  inputListItemProps,
}) => {
  const handleItemChange = (itemValue: string, index: number) => {
    if (!itemValue && index >= value.length) {
      return;
    }

    const nextValue = [...value];

    nextValue[index] = itemValue;
    onChange(nextValue);
  }

  const handleDelete = useCallback((index: number) => {
    const nextValue = [...value];

    nextValue.splice(index, 1);

    onChange(nextValue);
  }, [value, onChange]);

  const computedValue = useMemo(() => {
    if (value.length === 0) {
      return [""];
    }

    const lastValue = value[value.length - 1];

    return lastValue ? value.concat("") : value;
  }, [value]);

  return (
    <Fieldset spacing={spacing} label={label}>
      <List>
        {computedValue.map((currentValue: string, index: number) => {
          const currentInputListItemProps = inputListItemProps ? inputListItemProps(currentValue, index) : {};

          return (
            <InputListItem
              index={index}
              disabled={disabled}
              value={currentValue}
              onDelete={handleDelete}
              key={`${name}-${index}`}
              name={`${name}-${index}`}
              placeholder={placeholder}
              onChange={handleItemChange}
              label={`${label} - ${index + 1}`}
              {...currentInputListItemProps}
            />
          )
        })}
      </List>
    </Fieldset>
  );
}
