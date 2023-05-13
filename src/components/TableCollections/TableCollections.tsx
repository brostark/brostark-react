import { Grid, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import React, { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/appContext";
import { useCollection } from "../../hooks/useCollection";
import { FirestoreModel } from "../../lib/firestoreModel";
import { GetAllOptions } from "../../lib/firestoreService";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";
import { Loading } from "../Loading/Loading";
import { Spacer } from "../Spacer/Spacer";
import { styles } from "./tableCollections.styles";
import { FirestoreDocument } from "../../lib";

export interface TableCollectionsHead {
  label: string;
  orderBy?: string;
  width?: number;
}

export interface TableCollectionsSelectOptions<T> {
  limit?: number;
  readOnly?: boolean;
  selectable?: boolean;
  disableSelectAll?: boolean;
  defaultSelected?: string[];
  onSelectChange?: (selected: string[], fullItemSelected: T[]) => void;
}

interface TableCollectionsProps<T extends FirestoreDocument> {
  model: FirestoreModel<T, any>;
  orderBy?: string;
  defaultOptions?: GetAllOptions;
  headCells: TableCollectionsHead[];
  selectOptions?: TableCollectionsSelectOptions<T>;
  row: (item: T, index: number, array: T[]) => TableRowItemValues;
  onItemsChanged?: (items: T[]) => void;
}

export type TableRowItemValues = React.ReactNode[] | { onClick: () => void, cells: React.ReactNode[] };

export const TableCollections = <T extends FirestoreDocument, >({
  row,
  model,
  headCells,
  defaultOptions,
  onItemsChanged,
  selectOptions = {},
}: TableCollectionsProps<T>) => {
  const { isLoading } = useContext(AppContext);
  const [options, setOptions] = useState<GetAllOptions>(defaultOptions || {});
  const [selected, setSelected] = useState<string[]>([]);
  const collection = useCollection<T>(model, options);

  const selectable = selectOptions.selectable;
  const orderBy = options.orderBy || "createdAt";
  const orderDirection = options.direction || "desc";

  const callOnSelectChange = useCallback((selectedItems: string[]) => {
    if (selectOptions.onSelectChange) {
      selectOptions.onSelectChange(selectedItems, selectedItems.map((id) => collection.items.find(item => item.id === id)).filter(x => x) as T[]);
    }
  }, [selectOptions, collection.items]);

  const createSortHandler = useCallback((nextOrderBy: string) => () => {
    const nextOptions: GetAllOptions = {
      ...options,
      direction: "desc",
      orderBy: nextOrderBy,
    };

    if (nextOrderBy === options.orderBy) {
      nextOptions.direction = options.direction === "desc" ? "asc" : "desc";
    }

    setOptions(nextOptions);
  }, [options, setOptions]);

  const createSelectedChangeHandler = useCallback((item: T) => () => {
    let nextSelected: string[] = selected;

    if (selected.includes(item.id)) {
      nextSelected = selected.filter(s => s !== item.id);
    } else {
      nextSelected = selected.concat(item.id);
    }

    setSelected(nextSelected);
    callOnSelectChange(nextSelected);
  }, [selected, callOnSelectChange]);

  const handleToggleSelectAll = () => {
    if (selected.length > 0) {
      setSelected([]);
      return;
    }

    let selectedItems = collection.items.map(item => (item as FirestoreDocument).id);

    if (typeof selectOptions.limit === "number" && selectOptions.limit > 0) {
      selectedItems = selectedItems.slice(0, selectOptions.limit);
    }

    setSelected(selectedItems);
    callOnSelectChange(selectedItems);
  }

  useEffect(() => {
    setSelected(selectOptions.defaultSelected || []);
  }, [selectOptions.defaultSelected]);

  useEffect(() => {
    if (onItemsChanged) {
      onItemsChanged(collection.items);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection.items]);

  useEffect(() => {
    collection.refresh();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model, options]);

  return (
    <>
      <Table css={styles.table}>
        <TableHead>
          <TableRow>
            {selectable && (
              <TableCell padding="checkbox">
                {!selectOptions.disableSelectAll && (
                  <Checkbox
                    disabled={isLoading}
                    css={styles.marginCheckbox}
                    onChange={handleToggleSelectAll}
                    checked={selected.length > 0 && selected.length === collection.items.length}
                    indeterminate={selected.length > 0 && selected.length < collection.items.length}
                  />
                )}
              </TableCell>
            )}

            {headCells.map((headCell: TableCollectionsHead) => {
              const width: number | string = headCell.width || "calc(100% - 100px)";
              const isSorted: boolean = orderBy === headCell.orderBy;

              return (
                <TableCell
                  style={{ width }}
                  key={headCell.label}
                  sortDirection={isSorted ? orderDirection : undefined}
                >
                  {!headCell.orderBy && headCell.label}
                  {headCell.orderBy && (
                    <TableSortLabel
                      active={isSorted}
                      onClick={createSortHandler(headCell.orderBy)}
                      direction={isSorted ? orderDirection : undefined}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody css={styles.tableBody}>
          {collection.items.map((item: T, index: number, array: T[]) => {
            const result: TableRowItemValues = row(item, index, array);
            const values: ReactNode[] = Array.isArray(result) ? result : result.cells;
            const onClick: (() => void) | undefined = Array.isArray(result) ? undefined : result.onClick;

            return (
              <TableRow
                key={item.id}
                hover={!!onClick}
                onClick={onClick}
              >
                {selectable && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      css={styles.marginCheckbox}
                      checked={selected.includes(item.id)}
                      onChange={createSelectedChangeHandler(item)}
                    />
                  </TableCell>
                )}

                {values.map((value: React.ReactNode, index: number) => (
                  <TableCell
                    key={`${item.id}-${headCells[index].label}`}
                    css={styles.cell}
                  >{value}</TableCell>
                ))}
              </TableRow>
            )
          })}

          {isLoading && <tr css={styles.tableLoading}><Loading /></tr>}
        </TableBody>

      </Table>

      <Spacer />

      {collection.hasMore && (
        <Grid container alignItems="center" justifyContent="center">
          <Button
            isLoading={isLoading}
            onClick={collection.next}
          >
            Voir plus
          </Button>
        </Grid>
      )}
    </>
  );
}
