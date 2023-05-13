import { Delete } from "@mui/icons-material";
import { IconButton, ListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { InputText } from "../InputText";
import { styles } from "./inputList.styles";


interface InputListItemProps {
  name: string;
  index: number;
  label?: string;
  value: string;
  disabled?: boolean;
  placeholder?: string;
  onDelete?: (index: number) => void;
  LeftComponent?: React.ReactElement;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>, index: number) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>, index: number) => void;
  onChange: (value: string, index: number) => void;
}

export const InputListItem: React.FC<InputListItemProps> = ({
  name,
  index,
  label,
  value,
  onBlur,
  onFocus,
  onChange,
  disabled,
  onDelete,
  placeholder,
  LeftComponent,
}) => {
  const [nextValue, setNextValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setNextValue(e.target.value);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(index);
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onChange(nextValue, index);

    if (onBlur) {
      onBlur(e, index);
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onFocus) {
      onFocus(e, index);
    }
  }

  useEffect(() => {
    setNextValue(value);
  }, [value]);

  return (
    <ListItem css={styles.listItem}>
      <InputText
        fullWidth
        value={nextValue}
        onBlur={handleBlur}
        disabled={disabled}
        onFocus={handleFocus}
        onChange={handleChange}
        placeholder={placeholder}
        LeftComponent={LeftComponent}
        RightComponent={nextValue.length > 0 ? (
          <IconButton
            color="primary"
            disabled={disabled}
            onClick={handleDelete}
          >
            <Delete />
          </IconButton>
        ) : undefined}
      />
    </ListItem>
  )
};
