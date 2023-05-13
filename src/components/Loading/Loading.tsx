import { CircularProgress, Grid } from "@mui/material";
import React from "react";


interface LoadingProps {
  color?: "primary" | "secondary";
  children?: React.ReactElement;
  thickness?: number;
  size?: number;
}


export const Loading: React.FC<LoadingProps> = ({
  color,
  children,
  size = 30,
  thickness = 5,
}) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <CircularProgress
        size={size}
        color={color}
        thickness={thickness}
      />
      {children}
    </Grid>
  );
}
