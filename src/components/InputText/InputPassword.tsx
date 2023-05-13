import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, OutlinedTextFieldProps } from "@mui/material";
import React, { ClipboardEventHandler, ReactNode } from "react";
import { useState } from "react";
import { SpacingValue } from "../../hooks";
import { InputText } from "./InputText";


interface InputPasswordProps extends Omit<OutlinedTextFieldProps, "variant"> {
  value?: string | number;
  fullWidth?: boolean;
  placeholder?: string;
  spacing?: SpacingValue;
  disabled?: boolean;
  isLoading?: boolean;
  helperText?: string;
  label?: string;
  name?: string;
  success?: boolean;
  errorText?: ReactNode;
  onPaste?: ClipboardEventHandler<HTMLDivElement>;
  onPressEnter?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputPassword: React.FC<InputPasswordProps> = (props) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const handleTogglePasswordVisibility = () => setPasswordIsVisible(!passwordIsVisible);

  return (
    <InputText
      type={passwordIsVisible ? "text" : "password"}
      placeholder="*****"
      RightComponent={(
        <IconButton onClick={handleTogglePasswordVisibility}>
          {passwordIsVisible ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      )}
      {...props}
    />
  );
}
