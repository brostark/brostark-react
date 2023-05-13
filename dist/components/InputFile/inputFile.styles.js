import { css } from "@emotion/react";
import { theme } from "../../lib/theme";
export const styles = {
    root: css `
    width: 100%;
    cursor: pointer;
    border-radius: 4px;
    border: 1px dashed rgba(0, 0, 0, 0.4);
  `,
    rootWithLabel: css `
    border-style: solid;
  `,
    blobs: css `
    display: grid;
    grid-gap: ${theme.spacing(1)};
    grid-template-columns: repeat(5, 1fr);
  `,
    blobsSingle: css `
    grid-template-columns: repeat(1, 1fr);
    justify-items: center;
    aspect-ratio: 2;
  `,
    blob: css `
    aspect-ratio: 1;
    position: relative;
    background-size: cover;
    background-position: center;
  `,
    blobIcon: css `
    position: absolute;
    top: ${theme.spacing(1)};
    right: ${theme.spacing(1)};
  `,
    content: css `
    border-radius: 4px;
    text-align: center;
    padding: ${theme.spacing(1)};
  `,
    addIcon: css `
    font-size: 75px;
  `
};
