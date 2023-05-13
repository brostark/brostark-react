import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { CSSProperties, useContext } from "react";

import { AppContext } from "../../contexts/appContext";
import { Loading } from "../Loading/Loading";
import { Spacer } from "../Spacer/Spacer";

export interface HeadCell {
  key: string;
  label: string;
  fluid?: boolean;
  width?: number;
}


interface InfiniteListProps {
  name: string;
  items: React.ReactNode[];
  headCells: HeadCell[];  
  selectable?: boolean;
}

export const InfiniteList: React.FC<InfiniteListProps> = ({
  name,
  items,
  headCells,
  selectable,
}) => {
  const { isLoading } = useContext(AppContext);

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            {selectable && (
              <TableCell padding="checkbox">
                <Checkbox disabled={isLoading} />
              </TableCell>
            )}

            {headCells.map((headCell: HeadCell, index: number) => {
              const style: CSSProperties = {};

              if (headCell.fluid) {
                style.width = "calc(100% - 50px)";
              } else if (headCell.width) {
                style.width = headCell.width;
              }

              return (
                <TableCell
                  style={style}
                  key={headCell.label}
                >
                  {headCell.label}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map((item: React.ReactNode, index: number) => (
            <TableRow key={`${name}-${index}`}>
              {item}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Spacer spacing={6} />
      <Loading />
    </>
  );
}
