import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { Typography } from "@mui/material";
import { styles } from "./errorTypography.styles";
export const ErrorTypography = ({ align, children, className, }) => {
    return (_jsx(Typography, Object.assign({ align: align, variant: "caption", css: styles.root, className: className }, { children: children })));
};
