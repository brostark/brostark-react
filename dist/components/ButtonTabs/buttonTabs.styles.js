import { css } from "@emotion/react";
import { theme } from "../../lib";
export const styles = {
    tabsRoot: css `
    overflow-y: auto;
    padding-bottom: ${theme.spacing(2)};
  `,
    tabs: css `
    white-space: nowrap;

    & > * {
      display: inline-block;
      margin-right: ${theme.spacing(4)};
    }
  `,
};
