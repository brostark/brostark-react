var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
export const TypographyLink = (_a) => {
    var { url, label, disabled } = _a, typographyProps = __rest(_a, ["url", "label", "disabled"]);
    const renderLabel = _jsx(Typography, Object.assign({}, typographyProps, { children: label }));
    return (_jsxs(Grid, Object.assign({ container: true, alignItems: "center" }, { children: [!disabled && _jsx(Link, Object.assign({ to: url }, { children: renderLabel })), !!disabled && renderLabel] })));
};
