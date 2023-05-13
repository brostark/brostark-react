import { css } from "@emotion/react";
import { theme } from "../../lib";
export const styles = {
    fullWidth: css `
    flex: 1;
    width: 100%;
  `,
    success: css `
    & .MuiOutlinedInput-notchedOutline {
      border-color: ${theme.palette.success.light};
      border-width: 2px;
    }

    & .MuiFormLabel-root {
      color: ${theme.palette.success.light};
    }
  `,
};
