import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { Grid } from "@mui/material";
import { styles } from "./twoSideView.styles";
export const TwoSideViewFluid = ({ children, className, }) => {
    return (_jsx("div", Object.assign({ css: styles.fluidView, className: className }, { children: _jsx(Grid, Object.assign({ container: true, direction: "column", alignItems: "center" }, { children: children })) })));
};
