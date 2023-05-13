import { css } from "@emotion/react";
export const styles = {
    floatingActionContainer: css `
    position: fixed;
    right: 20px;
    bottom: 40px;
  `,
    floatingActionTop: css `
    border-radius: 4px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease-in-out;
  `,
    floatingActionTopVisible: css `
    visibility: visible;
    opacity: 1;
  `
};
