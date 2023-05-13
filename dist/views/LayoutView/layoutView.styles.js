import { css } from "@emotion/react";
import { HEADER_HEIGHT } from "../../constant";
import { theme } from "../../lib/theme";
export const styles = {
    root: css `
    min-height: 100vh;
    padding: ${theme.spacing(2)};
    padding-top: ${HEADER_HEIGHT + 20}px;
    background-color: #eee;
  `,
};
