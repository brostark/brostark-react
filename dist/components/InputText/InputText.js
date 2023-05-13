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
import { InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { conditionalCss } from "../../helpers";
import { useSpacing } from "../../hooks";
import { Loading } from "../Loading/Loading";
import { styles } from "./inputText.styles";
export const InputText = (_a) => {
    var { type = "text", value, error, style, onBlur, success, onFocus, spacing, children, disabled, isLoading, errorText, fullWidth, onPressEnter, LeftComponent, RightComponent } = _a, textFieldProps = __rest(_a, ["type", "value", "error", "style", "onBlur", "success", "onFocus", "spacing", "children", "disabled", "isLoading", "errorText", "fullWidth", "onPressEnter", "LeftComponent", "RightComponent"]);
    const [isFocused, setIsFocused] = useState(false);
    const styleWithSpacing = useSpacing(spacing, style);
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && onPressEnter) {
            onPressEnter(e);
        }
    };
    let currentRightComponent = RightComponent;
    if (isLoading) {
        currentRightComponent = _jsx(Loading, { size: 15, thickness: 3 });
    }
    const handleFocus = (e) => {
        setIsFocused(true);
        if (onFocus) {
            onFocus(e);
        }
    };
    const handleBlur = (e) => {
        setIsFocused(false);
        if (onBlur) {
            onBlur(e);
        }
    };
    return (_jsxs("div", Object.assign({ css: conditionalCss(fullWidth, styles.fullWidth) }, { children: [_jsx(TextField, Object.assign({ fullWidth: fullWidth, css: conditionalCss(success && !isFocused, styles.success), value: value === null || value === void 0 ? void 0 : value.toString(), type: type, variant: "outlined", disabled: isLoading || disabled, onKeyDown: handleKeyDown, error: !isFocused && ((Array.isArray(errorText) ? errorText.length > 0 : !!errorText) || error), onBlur: handleBlur, onFocus: handleFocus, style: styleWithSpacing, InputLabelProps: {
                    shrink: true,
                }, InputProps: {
                    startAdornment: LeftComponent && (_jsx(InputAdornment, Object.assign({ position: "start" }, { children: LeftComponent }))),
                    endAdornment: currentRightComponent && (_jsx(InputAdornment, Object.assign({ position: "end" }, { children: currentRightComponent })))
                }, inputProps: {
                    autoComplete: "false",
                } }, textFieldProps)), Array.isArray(errorText) && errorText.map((currentText, index) => (_jsx(Typography, Object.assign({ variant: "caption", color: "red" }, { children: currentText }), `error-text${index}`))), errorText && !Array.isArray(errorText) && _jsx(Typography, Object.assign({ variant: "caption", color: "red" }, { children: errorText })), children] })));
};
