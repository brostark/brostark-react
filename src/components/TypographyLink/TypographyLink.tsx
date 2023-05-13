import React from "react"
import { Link } from "react-router-dom"
import { Grid, Typography, TypographyProps } from "@mui/material";


export interface TypographyLinkProps extends TypographyProps {
  url: string;
  label: string;
  disabled?: boolean;
}


export const TypographyLink: React.FC<TypographyLinkProps> = ({
  url,
  label,
  disabled,
  ...typographyProps
}) => {
  const renderLabel = <Typography {...typographyProps}>{label}</Typography>;

  return (
    <Grid
      container
      alignItems="center"
    >
      {!disabled && <Link to={url}>{renderLabel}</Link>}
      {!!disabled && renderLabel}
    </Grid>
  )
}
