import { Typography } from "@mui/material";
import React from "react";
import { Button } from "../../components";
import { RESERVED_ROUTES } from "../../constant";
import { styles } from "./notFoundView.styles";


export const NotFoundView = () => {
  return (
    <div css={styles.root}>
      <Typography align="center" variant="h1" css={styles.h1}>404</Typography>
      <Typography align="center" variant="h2" sx={{ marginTop: 4 }}>Page Not Found</Typography>
      <Typography align="center" sx={{ marginTop: 2 }}>We couldn't find the page you are looking for.</Typography>

      <Button
        color="primary"
        variant="outlined"
        spacing={{ top: 8 }}
        to={RESERVED_ROUTES.HOME}
      >
        Back to home
      </Button>
    </div>
  );
};

