import { css, keyframes } from "@emotion/react";
import { theme } from "../../lib/theme";


interface TitleStyleParams {
  light?: boolean;
}


const watermarkAnimation = keyframes`
  0% {
    opacity: 0.07;
    letter-spacing: 2px;
  }

  40% {
    opacity: 0;
    letter-spacing: 20px;
  }

  41% {
    letter-spacing: 2px;
    opacity: 0;
  }

  50% {
    opacity: 0.07;
    letter-spacing: 2px;
  }
`;

export const styles = {
  root: css`
    overflow: hidden;
    position: relative;
    text-align: center;
  `,

  title: ({
    light,
  }: TitleStyleParams) => css`
    user-select: none;
    text-transform: uppercase;
    color: ${light ? "white" : theme.palette.primary.main};
  `,

  watermark: css`
    outline: 0;
    font-weight: 800;
    font-size: 100px;
    position: absolute;
    text-align: center;
    opacity: 0.07;
    white-space: nowrap;
    letter-spacing: 2px;

    animation: ${watermarkAnimation} 20s ease infinite;
    animation-delay: 3s;
  `
}