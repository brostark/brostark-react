import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { Button as MuiButton, CircularProgress } from "@mui/material";
import { styles } from "./button.styles";
import { Link } from "react-router-dom";
import { useSpacing } from "../../hooks";
export const Button = ({ to, href, size, target, onClick, spacing, disabled, children, isLoading, fullWidth, className, color = "inherit", variant = "contained", }) => {
    const styleWithSpacing = useSpacing(spacing);
    return (_jsxs(MuiButton, Object.assign({ to: to, href: href, size: size, color: color, target: target, variant: variant, onClick: onClick, fullWidth: fullWidth, className: className, style: styleWithSpacing, disabled: disabled || isLoading, component: to ? Link : "button" }, { children: [isLoading && _jsx(CircularProgress, { css: styles.loading, size: 16 }), children] })));
};
