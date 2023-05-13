import React, { SyntheticEvent } from "react";
import { Button as MuiButton, CircularProgress } from "@mui/material";

import { styles } from "./button.styles";
import { Link } from "react-router-dom";
import { SpacingValue, useSpacing } from "../../hooks";


interface ButtonProps {
  className?: string;
  color?: "primary" | "secondary" | "inherit" | "success" | "error" | "info" | "warning";
  variant?: "contained" | "outlined" | "text";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  isLoading?: boolean;
  href?: string;
  to?: string;
  target?: string;
  onClick?: (e: SyntheticEvent) => void;
  fullWidth?: boolean;
  spacing?: SpacingValue;
  children?: React.ReactNode;
}


export const Button: React.FC<ButtonProps> = ({
  to,
  href,
  size,
  target,
  onClick,
  spacing,
  disabled,
  children,
  isLoading,
  fullWidth,
  className,
  color = "inherit",
  variant = "contained",
}) => {
  const styleWithSpacing = useSpacing(spacing);

  return (
    <MuiButton
      to={to}
      href={href}
      size={size}
      color={color}
      target={target}
      variant={variant}
      onClick={onClick}
      fullWidth={fullWidth}
      className={className}
      style={styleWithSpacing}
      disabled={disabled || isLoading}
      component={to ? Link : "button"}
    >
      {isLoading && <CircularProgress css={styles.loading} size={16} />}
      {children}
    </MuiButton>
  );
}
