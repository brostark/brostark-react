import React from "react";
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
export declare const InfiniteList: React.FC<InfiniteListProps>;
export {};
//# sourceMappingURL=InfiniteList.d.ts.map