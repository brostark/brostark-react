import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../contexts/appContext";
import { Loading } from "../Loading/Loading";
import { Spacer } from "../Spacer/Spacer";
export const InfiniteList = ({ name, items, headCells, selectable, }) => {
    const { isLoading } = useContext(AppContext);
    return (_jsxs(_Fragment, { children: [_jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [selectable && (_jsx(TableCell, Object.assign({ padding: "checkbox" }, { children: _jsx(Checkbox, { disabled: isLoading }) }))), headCells.map((headCell, index) => {
                                    const style = {};
                                    if (headCell.fluid) {
                                        style.width = "calc(100% - 50px)";
                                    }
                                    else if (headCell.width) {
                                        style.width = headCell.width;
                                    }
                                    return (_jsx(TableCell, Object.assign({ style: style }, { children: headCell.label }), headCell.label));
                                })] }) }), _jsx(TableBody, { children: items.map((item, index) => (_jsx(TableRow, { children: item }, `${name}-${index}`))) })] }), _jsx(Spacer, { spacing: 6 }), _jsx(Loading, {})] }));
};
