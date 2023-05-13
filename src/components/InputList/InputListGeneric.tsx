import { Add } from "@mui/icons-material";
import { List } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { SpacingValue } from "../../hooks";
import { Button } from "../Button";
import { Fieldset } from "../Fieldset";


export interface InputListItemProps<T> {
  value: T;
  index: number;
  onChange: (value: T) => void;
  onDelete: () => void;
}


export interface InputListGenericProps<T> {
  name?: string;
  label?: string;
  value: T[];
  limit?: number;
  disabled?: boolean;
  placeholder?: string;
  defaultValue: (() => T) | T;
  spacing?: SpacingValue;
  onChange: (values: T[]) => void;
  renderItem: (props: InputListItemProps<T>) => React.ReactNode;
}


export const InputListGeneric = <T, >({
  name,
  label,
  value,
  limit,
  spacing,
  onChange,
  disabled,
  renderItem,
  placeholder,
  defaultValue,
}: InputListGenericProps<T>) => {
  const handleItemChange = (itemValue: T, index: number) => {
    if (!itemValue && index >= value.length) {
      return;
    }

    const nextValue = [...value];

    nextValue[index] = itemValue;
    onChange(nextValue);
  }

  const handleDelete = useCallback((index: number) => {
    console.log("--- deleted index", index);
    const nextValue = [...value];

    nextValue.splice(index, 1);

    onChange(nextValue);
  }, [value, onChange]);

  const handleClickAdd = () => onChange(value.concat(defaultValue instanceof Function ? defaultValue() : defaultValue));

  /*
  const computedValue = useMemo(() => {
    if (value.length === 0) {
      return [defaultValue];
    }

    const lastValue = value[value.length - 1];

    return lastValue ? value.concat(defaultValue) : value;
  }, [value, defaultValue]);
  console.log("--- computed value", computedValue);
  */

  /*
  useEffect(() => {
    handleClickAdd();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  */

  return (
    <Fieldset spacing={spacing} label={label}>
      <List>
        {value.map((currentValue: T, index: number) => {
          return renderItem({
            index,
            value: currentValue,
            onDelete: () => handleDelete(index),
            onChange: (nextValue) => handleItemChange(nextValue, index),
          });
        })}
      </List>

      <Button
        fullWidth
        variant="text"
        color="primary"
        onClick={handleClickAdd}
        disabled={disabled || (!!limit && value.length >= limit)}
      >
        <Add /> Ajouter{!!limit && limit > 0 ? ` (${value.length} / ${limit})` : ""}
      </Button>
    </Fieldset>
  );
}
