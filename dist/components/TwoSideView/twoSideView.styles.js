import { css } from "@emotion/react";
import { theme } from "../../lib";
export const styles = {
    root: css `
    position: relative;
  `,
    rootOneSide: css `
    & > *:first-child {
      width: 100%;
    }
  `,
    fixedView: css `
    width: 350px;
    position: fixed;
    right: 16px;
    top: 103px;
    height: calc(100vh - 204px);
    overflow-y: auto;

    @media screen and (max-width: ${theme.breakpoints.values.md}px) {
      position: static;
      width: 100%;
      height: auto;
      margin-bottom: ${theme.spacing(2)};
    };
  `,
    fluidView: css `
    width: calc(100% - 366px);

    @media screen and (max-width: ${theme.breakpoints.values.md}px) {
      width: 100%;
    }
  `,
    fullWidth: css `
    width: 100%;
  `,
    avatar: css `
    width: 100px;
    height: 100px;
  `,
};
