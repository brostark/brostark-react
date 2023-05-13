import { css } from "@emotion/react";
import { theme } from "../../lib";

export const styles = {
  typeObject: css`
    margin-top: ${theme.spacing(2)};
    border-left: 5px solid #ccc;
    border-radius: ${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px;
  `,

  typeObjectSelected: css`
    border-color: ${theme.palette.primary.main};
  `,

  typeImage: css`
    max-height: 500px;
    max-width: 100%;
  `,
};
