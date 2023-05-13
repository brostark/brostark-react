import React from "react";
import { FirestoreModel } from "../../lib/firestoreModel";
import { GetAllOptions } from "../../lib/firestoreService";
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
export type TableRowItemValues = React.ReactNode[] | {
    onClick: () => void;
    cells: React.ReactNode[];
};
export declare const TableCollections: <T extends FirestoreDocument>({ row, model, headCells, defaultOptions, onItemsChanged, selectOptions, }: TableCollectionsProps<T>) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TableCollections.d.ts.map