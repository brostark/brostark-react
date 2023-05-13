import { css } from "@emotion/react";
import { theme } from "../../lib/theme";

export const styles = {
  root: css`
    flex: 1;
    width: 100%;
    border-radius: 3;
    margin: 0 auto;
    padding: 0;

    &.Mui-disabled {
      background-color: white;
    }
  `,

  first: css`
    &:before {
      background-color: transparent;
    }
  `,

  header: css`
    width: 100%;
    z-index: 1;
    position: relative;
    border-radius: 0;

    & .MuiAccordionSummary-content {
      align-items: center;

      & > *:nth-child(2) {
        margin-left: ${theme.spacing(2)};
      }
    }
  `,

  details: css`
    padding: ${theme.spacing(2)};
    overflow-x: auto;
  `,

  icon: css`
    margin-right: ${theme.spacing(2)};
  `,

  content: css`
    padding: ${theme.spacing(2)};
    visibility: visible;
    opacity: 1;
    margin-top: 0;
    transition: all 0.2s ease-in-out;
  `,
}
