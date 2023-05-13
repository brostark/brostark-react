import { ClassNamesContent } from "@emotion/react";
import { theme } from "../../lib";

export const createClassNames = (css: ClassNamesContent["css"]) => ({
  fieldset: css`
    padding: 0;

    & legend {
      margin-left: 8px;
    }
  `,

  tags: css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: ${theme.spacing(1)};
    padding: ${theme.spacing(1)};
    border-top: 1px solid #ccc;
  `,

  tagRemove: css`
    font-size: 17px;
    border: none;
    height: 100%;
    cursor: pointer;
    background: transparent;
    margin-left: ${theme.spacing(1)};
    color: ${theme.palette.common.white};
  `,

  tag: css`
    min-height: 30px;
    line-height: 25px;
    display: inline-block;
    color: ${theme.palette.common.white};
    border-radius: ${theme.shape.borderRadius}px;
    background-color: ${theme.palette.primary.main};
    padding: ${theme.spacing(0.2)} ${theme.spacing(1)};
    padding-right: 0;
  `,

  tagInput: css`
    display: flex;
    flex-direction: column;
  `,

  tagInputField: css`
    border: 0;
    outline: 0;
    height: 56px;
    font-size: 16px;
    margin-top: -12px;
    background: transparent;
    padding: ${theme.spacing(2)} 14px;
  `,
});