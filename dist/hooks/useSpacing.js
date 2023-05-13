import { useMemo } from "react";
import { theme } from "../lib";
export const useSpacing = (spacing, defaultStyle) => {
    const style = useMemo(() => {
        const value = Object.assign({}, defaultStyle);
        if (typeof spacing === "boolean") {
            value.margin = theme.spacing(2);
        }
        else if (typeof spacing === "number") {
            value.margin = theme.spacing(spacing);
        }
        else if (spacing) {
            if (spacing.top) {
                value.marginTop = theme.spacing(spacing.top);
            }
            if (spacing.bottom) {
                value.marginBottom = theme.spacing(spacing.bottom);
            }
            if (spacing.left) {
                value.marginLeft = theme.spacing(spacing.left);
            }
            if (spacing.right) {
                value.marginRight = theme.spacing(spacing.right);
            }
            if (spacing.x) {
                value.marginLeft = theme.spacing(spacing.x);
                value.marginRight = theme.spacing(spacing.x);
            }
            if (spacing.y) {
                value.marginTop = theme.spacing(spacing.y);
                value.marginBottom = theme.spacing(spacing.y);
            }
        }
        return value;
    }, [spacing, defaultStyle]);
    return style;
};
