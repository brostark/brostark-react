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
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { FormControlLabel, Checkbox as MuiCheckbox } from "@mui/material";
export const Checkbox = (_a) => {
    var { label, className, labelProps, margin = false, color = "primary" } = _a, props = __rest(_a, ["label", "className", "labelProps", "margin", "color"]);
    return (_jsx(FormControlLabel, Object.assign({ label: label, control: _jsx(MuiCheckbox, Object.assign({}, props, { color: color })) }, labelProps)));
};
