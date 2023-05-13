import { css } from "@emotion/react";
import { theme } from "../../lib/theme";
export const styles = {
    root: css `
    position: relative;
    border-radius: 4px;
    padding: ${theme.spacing(2)} 14px;
    padding-top: 4px;
    border-style: solid;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.23);
    margin-top: -${theme.spacing(1)};
  `,
    noPadding: css `
    padding: 0;

    & > legend {
      margin-left: 8px;
    }
  `,
    hoverable: css `
    &:hover {
      border-color: rgba(0, 0, 0, 0.87);
    }

    &:focus {
      border-width: 2px;
      border-color: ${theme.palette.primary.main};

      & > legend {
        color: ${theme.palette.primary.main};
      }
    }
  `,
    focused: css `
    border-width: 2px !important;
    border-color: ${theme.palette.primary.main} !important;

    & > legend ~ span {
      color: ${theme.palette.primary.main} !important;
    }
  `,
    fullWidth: css `
    flex: 1;
    width: 100%;
  `,
    clickable: css `
    cursor: pointer;
  `,
    legend: css `
    display: block;
    float: unset;
    overflow: hidden;
    margin-left: -5px;
  `,
    label: css `
    color: rgba(0, 0, 0, 0.6);
    font-size: 16px;
    max-width: calc(133% - 24px);
    position: absolute;
    left: -5px;
    top: -15px;
    transform: translate(14px, -9px) scale(0.75);
  `,
    legendLabel: css `
    visibility: hidden;
    padding: 0;
    display: inline-block;
  `,
};
