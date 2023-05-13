import { css } from "@emotion/react";


export const styles = {
  marginCheckbox: css`
    margin-left: 0;
  `,

  table: css`
    min-height: 250px;
  `,

  cell: css`
    overflow: hidden;
  `,

  tableBody: css`
    position: relative;
  `,

  tableLoading: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};
