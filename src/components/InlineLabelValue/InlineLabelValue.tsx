import { Grid, ListSubheader } from "@mui/material";
import React from "react";


interface InlineColProps {
  label?: string;
  children?: React.ReactNode;
}

export const InlineLabelValue: React.FC<InlineColProps> = ({
  label,
  children,
}) => {
  return (
    <Grid container alignItems="center" justifyContent="space-between" wrap="nowrap">
      <Grid container alignItems="center" justifyContent="flex-start" wrap="nowrap">
        <ListSubheader>{label}</ListSubheader>
      </Grid>

      <Grid container alignItems="center" justifyContent="flex-end">
        {children}
      </Grid>
    </Grid>
  )
}