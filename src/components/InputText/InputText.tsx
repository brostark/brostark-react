import { CSSProperties } from "@emotion/serialize";
import { InputAdornment, OutlinedTextFieldProps, TextField, Typography } from "@mui/material";
import React, { ClipboardEventHandler, KeyboardEvent } from "react";
import { ReactNode } from "react";
import { useState } from "react";
import { conditionalCss } from "../../helpers";
import { SpacingValue, useSpacing } from "../../hooks";
import { Loading } from "../Loading/Loading";
import { styles } from "./inputText.styles";

export interface InputTextProps extends Omit<OutlinedTextFieldProps, "variant"> {
  type?: string;
  error?: boolean;
  success?: boolean;
  children?: ReactNode;
  value?: string | number;
  multiline?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  spacing?: SpacingValue;
  disabled?: boolean;
  isLoading?: boolean;
  helperText?: string;
  label?: string;
  name?: string;
  errorText?: ReactNode;
  LeftComponent?: React.ReactElement;
  RightComponent?: React.ReactElement;
  onPaste?: ClipboardEventHandler<HTMLDivElement>;
  onPressEnter?: (e: KeyboardEvent<HTMLDivElement>) => void;
}


export const InputText: React.FC<InputTextProps> = ({
  type = "text",
  value,
  error,
  style,
  onBlur,
  success,
  onFocus,
  spacing,
  children,
  disabled,
  isLoading,
  errorText,
  fullWidth,
  onPressEnter,
  LeftComponent,
  RightComponent,
  ...textFieldProps
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const styleWithSpacing = useSpacing(spacing, style);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onPressEnter) {
      onPressEnter(e);
    }
  }

  let currentRightComponent = RightComponent;

  if (isLoading) {
    currentRightComponent = <Loading size={15} thickness={3} />;
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(true);

    if (onFocus) {
      onFocus(e);
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(false);

    if (onBlur) {
      onBlur(e);
    }
  }

  return (
    <div css={conditionalCss(fullWidth, styles.fullWidth)}>
      <TextField
        fullWidth={fullWidth}
        css={conditionalCss(success && !isFocused, styles.success)}
        value={value?.toString()}
        type={type}
        variant="outlined"
        disabled={isLoading || disabled}
        onKeyDown={handleKeyDown}
        error={!isFocused && ((Array.isArray(errorText) ? errorText.length > 0 : !!errorText) || error)}
        onBlur={handleBlur}
        onFocus={handleFocus}
        style={styleWithSpacing}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: LeftComponent && (
            <InputAdornment position="start">
              {LeftComponent}
            </InputAdornment>
          ),
          endAdornment: currentRightComponent && (
            <InputAdornment position="end">
              {currentRightComponent}
            </InputAdornment>
          )
        }}
        inputProps={{
          autoComplete: "false",
        }}
        {...textFieldProps}
      />

      {Array.isArray(errorText) && errorText.map((currentText, index) => (
        <Typography variant="caption" color="red" key={`error-text${index}`}>{currentText}</Typography>
      ))}

      {errorText && !Array.isArray(errorText) && <Typography variant="caption" color="red">{errorText}</Typography>}

      {children}
    </div>
  );
};
