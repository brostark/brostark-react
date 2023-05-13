import { css } from "@emotion/react";
import { theme } from "../../lib/theme";

export const styles = {
  root: css`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-position: 50% 0%;
    background-size: contain;
    background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);

    & > * {
      height: 100%;
    }
    
    ${theme.breakpoints.down("md")} {
      flex-direction: column;
    }

    ${theme.breakpoints.down("sm")} {
      height: auto;
    }
  `,

  rootFlex: css`
    display: flex;
    flex-direction: column;
  `,

  leftContainer: css`
    width: 100%;
    position: relative;
    overflow: hidden;

    ${theme.breakpoints.down("md")} {
      display: flex;
      flex-direction: column;
      padding-bottom: ${theme.spacing(4)};
    }
  `,

  formContainer: css`
    position: relative;
    z-index: 1;
    max-width: 450px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;


    ${theme.breakpoints.down("md")} {
      max-width: none;
      width: 80%;
      margin: 0 auto;
      height: auto;
    }
  `,

  formContent: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${theme.spacing(3)};
    padding-top: ${theme.spacing(8)};

    ${theme.breakpoints.down("md")} {
      padding-top: ${theme.spacing(2)};
    }
  `,

  checkboxAndRememberContainer: css`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;

    ${theme.breakpoints.down("md")} {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  `
}
