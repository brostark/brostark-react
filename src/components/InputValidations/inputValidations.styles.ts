import { css } from "@emotion/react";
import { theme } from "../../lib";

export const styles = {
  root: css`
    margin: ${theme.spacing(2)};
    margin-top: ${theme.spacing(1)};

    z-index: -1;
    opacity: 1;
    max-height: 100px;
    position: relative;
    transition: all 0.25s ease;
    transform: translateY(0);
  `,

  hidden: css`
    margin-top: 0;
    margin-bottom: 0;
    opacity: 0;
    max-height: 0;
    transform: translateY(-70px);
  `
}