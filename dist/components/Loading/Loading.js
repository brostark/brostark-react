import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { CircularProgress, Grid } from "@mui/material";
export const Loading = ({ color, children, size = 30, thickness = 5, }) => {
    return (_jsxs(Grid, Object.assign({ container: true, alignItems: "center", justifyContent: "center", flexDirection: "column" }, { children: [_jsx(CircularProgress, { size: size, color: color, thickness: thickness }), children] })));
};
