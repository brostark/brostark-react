import { css } from "@emotion/react";
import { HEADER_HEIGHT } from "../../constant";
import { theme } from "../../lib/theme";
export const styles = {
    burgerIconButton: css `
    border-radius: 10px;
  `,
    container: css `
    height: ${HEADER_HEIGHT}px;
  `,
    appBar: css `
    z-index: 9999;
    transition: background-color 0.5s ease-in-out;
  `,
    appBarOverlay: css `
    background-color: white;
  `,
    headRight: css `
    display: flex;
    align-items: center;
  `,
    listItemButton: css `
    padding: 0;
  `,
    headFill: css `
    flex: 1;
  `,
    burger: css `
    width: 20px;
    height: 16px;
    cursor: pointer;
    position: relative;
    transform: rotate(0deg);
    transition: .2s ease-in-out;

    & > span {
      left: 0;
      height: 2px;
      opacity: 1px;
      width: 100%;
      border-radius: 4px;
      display: block;
      position: absolute;
      transform: rotate(0deg);
      transition: .15s ease-in-out;
      background: ${theme.palette.common.black};

      &:nth-child(1) {
        top: 2px;
      };

      &:nth-child(2) {
        top: 8px;
      };

      &:nth-child(3) {
        top: 14px;
      };
    };

    &.opened {
      & > span {
        &:nth-child(1) {
          top: 8px;
          transform: rotate(135deg);
        };

        &:nth-child(2) {
          left: -5px;
          opacity: 0;
        };

        &:nth-child(3) {
          top: 8px;
          transform: rotate(-135deg);
        }
      }
    }
  `,
};
