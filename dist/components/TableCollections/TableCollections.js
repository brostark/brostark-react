import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { Grid, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/appContext";
import { useCollection } from "../../hooks/useCollection";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";
import { Loading } from "../Loading/Loading";
import { Spacer } from "../Spacer/Spacer";
import { styles } from "./tableCollections.styles";
export const TableCollections = ({ row, model, headCells, defaultOptions, onItemsChanged, selectOptions = {}, }) => {
    const { isLoading } = useContext(AppContext);
    const [options, setOptions] = useState(defaultOptions || {});
    const [selected, setSelected] = useState([]);
    const collection = useCollection(model, options);
    const selectable = selectOptions.selectable;
    const orderBy = options.orderBy || "createdAt";
    const orderDirection = options.direction || "desc";
    const callOnSelectChange = useCallback((selectedItems) => {
        if (selectOptions.onSelectChange) {
            selectOptions.onSelectChange(selectedItems, selectedItems.map((id) => collection.items.find(item => item.id === id)).filter(x => x));
        }
    }, [selectOptions, collection.items]);
    const createSortHandler = useCallback((nextOrderBy) => () => {
        const nextOptions = Object.assign(Object.assign({}, options), { direction: "desc", orderBy: nextOrderBy });
        if (nextOrderBy === options.orderBy) {
            nextOptions.direction = options.direction === "desc" ? "asc" : "desc";
        }
        setOptions(nextOptions);
    }, [options, setOptions]);
    const createSelectedChangeHandler = useCallback((item) => () => {
        let nextSelected = selected;
        if (selected.includes(item.id)) {
            nextSelected = selected.filter(s => s !== item.id);
        }
        else {
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
        let selectedItems = collection.items.map(item => item.id);
        if (typeof selectOptions.limit === "number" && selectOptions.limit > 0) {
            selectedItems = selectedItems.slice(0, selectOptions.limit);
        }
        setSelected(selectedItems);
        callOnSelectChange(selectedItems);
    };
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
    return (_jsxs(_Fragment, { children: [_jsxs(Table, Object.assign({ css: styles.table }, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [selectable && (_jsx(TableCell, Object.assign({ padding: "checkbox" }, { children: !selectOptions.disableSelectAll && (_jsx(Checkbox, { disabled: isLoading, css: styles.marginCheckbox, onChange: handleToggleSelectAll, checked: selected.length > 0 && selected.length === collection.items.length, indeterminate: selected.length > 0 && selected.length < collection.items.length })) }))), headCells.map((headCell) => {
                                    const width = headCell.width || "calc(100% - 100px)";
                                    const isSorted = orderBy === headCell.orderBy;
                                    return (_jsxs(TableCell, Object.assign({ style: { width }, sortDirection: isSorted ? orderDirection : undefined }, { children: [!headCell.orderBy && headCell.label, headCell.orderBy && (_jsx(TableSortLabel, Object.assign({ active: isSorted, onClick: createSortHandler(headCell.orderBy), direction: isSorted ? orderDirection : undefined }, { children: headCell.label })))] }), headCell.label));
                                })] }) }), _jsxs(TableBody, Object.assign({ css: styles.tableBody }, { children: [collection.items.map((item, index, array) => {
                                const result = row(item, index, array);
                                const values = Array.isArray(result) ? result : result.cells;
                                const onClick = Array.isArray(result) ? undefined : result.onClick;
                                return (_jsxs(TableRow, Object.assign({ hover: !!onClick, onClick: onClick }, { children: [selectable && (_jsx(TableCell, Object.assign({ padding: "checkbox" }, { children: _jsx(Checkbox, { css: styles.marginCheckbox, checked: selected.includes(item.id), onChange: createSelectedChangeHandler(item) }) }))), values.map((value, index) => (_jsx(TableCell, Object.assign({ css: styles.cell }, { children: value }), `${item.id}-${headCells[index].label}`)))] }), item.id));
                            }), isLoading && _jsx("tr", Object.assign({ css: styles.tableLoading }, { children: _jsx(Loading, {}) }))] }))] })), _jsx(Spacer, {}), collection.hasMore && (_jsx(Grid, Object.assign({ container: true, alignItems: "center", justifyContent: "center" }, { children: _jsx(Button, Object.assign({ isLoading: isLoading, onClick: collection.next }, { children: "Voir plus" })) })))] }));
};
