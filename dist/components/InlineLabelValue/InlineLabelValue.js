import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { Grid, ListSubheader } from "@mui/material";
export const InlineLabelValue = ({ label, children, }) => {
    return (_jsxs(Grid, Object.assign({ container: true, alignItems: "center", justifyContent: "space-between", wrap: "nowrap" }, { children: [_jsx(Grid, Object.assign({ container: true, alignItems: "center", justifyContent: "flex-start", wrap: "nowrap" }, { children: _jsx(ListSubheader, { children: label }) })), _jsx(Grid, Object.assign({ container: true, alignItems: "center", justifyContent: "flex-end" }, { children: children }))] })));
};
