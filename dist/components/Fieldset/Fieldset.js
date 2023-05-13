import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { Typography } from "@mui/material";
import { conditionalCss } from "../../helpers";
import { useSpacing } from "../../hooks";
import { styles } from "./fieldset.styles";
export const Fieldset = ({ label, style, spacing, onClick, focused, children, fullWidth, className, disableHover, disablePadding, }) => {
    const styleWithSpacing = useSpacing(spacing, style);
    return (_jsxs("fieldset", Object.assign({ onClick: onClick, className: className, style: styleWithSpacing, css: [
            styles.root,
            conditionalCss(fullWidth, styles.fullWidth),
            conditionalCss(!!onClick, styles.clickable),
            conditionalCss(!disableHover, styles.hoverable),
            conditionalCss(focused, styles.focused),
            conditionalCss(disablePadding, styles.noPadding),
        ] }, { children: [_jsx("legend", Object.assign({ css: styles.legend }, { children: _jsx(Typography, Object.assign({ component: "span", css: styles.legendLabel }, { children: label })) })), _jsx(Typography, Object.assign({ component: "span", css: styles.label }, { children: label })), children] })));
};
