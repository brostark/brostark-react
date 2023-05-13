import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { useMemo } from "react";
import { conditionalCss } from "../../helpers";
import { styles } from "./section.styles";
export const Section = ({ open, title, first, onChange, children, leftIcon, disabled, className, titleProps, defaultClosed, }) => {
    const expanded = useMemo(() => {
        return typeof open !== "undefined" ? open : undefined;
    }, [open]);
    const handleChange = (e, nextExpanded) => onChange && onChange(nextExpanded);
    return (_jsxs(Accordion, Object.assign({ disabled: disabled, expanded: expanded, className: className, onChange: onChange ? handleChange : undefined, defaultExpanded: disabled ? false : !defaultClosed, css: [styles.root, conditionalCss(first, styles.first)] }, { children: [_jsxs(AccordionSummary, Object.assign({ color: "primary", css: styles.header, expandIcon: disabled ? undefined : _jsx(ExpandMore, {}) }, { children: [leftIcon, _jsx(Typography, Object.assign({ variant: "h4" }, titleProps, { children: title }))] })), !disabled && (_jsx(AccordionDetails, Object.assign({ css: styles.details }, { children: children })))] })));
};
