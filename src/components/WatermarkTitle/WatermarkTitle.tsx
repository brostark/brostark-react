import { Grid, Typography } from "@mui/material";
import React from "react";
import { styles } from "./watermarkTitle.styles";


interface WatermarkTitleProps {
  title: string;
  light?: boolean;
}


export const WatermarkTitle: React.FC<WatermarkTitleProps> = ({
  light,
  title,
}) => {
  return (
    <Grid container justifyContent="center" css={styles.root}>
      <Typography variant="h1" css={styles.title({ light })}>{title}</Typography>
      <Typography
        variant="h1"
        css={[styles.title({ light }), styles.watermark]}
      >
        {title}
      </Typography>
    </Grid>
  );
};
