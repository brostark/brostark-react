import { css } from "@emotion/react";
import { theme } from "../../lib";

export const styles = {
  root: css`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;

    ${theme.breakpoints.down("sm")} {
      display: block;
    }
  `,

  reversed: css`
    flex-direction: row-reverse;
  `,

  backgroundImageReversed: css`
    border-radius: 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0;
  `,

  backgroundImageContainer: css`
    width: 40%;
    min-height: 300px;
    position: relative;

    ${theme.breakpoints.down("sm")} {
      width: 100%;
    }
  `,

  backgroundImage: css`
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    background-size: cover;
    background-position: center;
    border-radius: ${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px;

    ${theme.breakpoints.down("sm")} {
      border-radius: ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0;
    }
  `,

  content: css`
    flex: 1;
    padding: ${theme.spacing(4)};

    ${theme.breakpoints.down("md")} {
      padding: ${theme.spacing(4)};
    }

    ${theme.breakpoints.down("sm")} {
      padding: ${theme.spacing(2)};
    }
  `,

  image: css`
    width: 100%;
  `,
};
