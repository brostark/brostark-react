import { Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { styles } from "./errorTypography.styles";


interface ErrorTypographyProps {
  className?: string;
  children?: ReactNode;
  align?: "left" | "center" | "justify" | "right",
}

export const ErrorTypography: React.FC<ErrorTypographyProps> = ({
  align,
  children,
  className,
}) => {
  return (
    <Typography
      align={align}
      variant="caption"
      css={styles.root}
      className={className}
    >
      {children}
    </Typography>
  )
}