import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { Grid, Typography } from "@mui/material";
import { styles } from "./watermarkTitle.styles";
export const WatermarkTitle = ({ light, title, }) => {
    return (_jsxs(Grid, Object.assign({ container: true, justifyContent: "center", css: styles.root }, { children: [_jsx(Typography, Object.assign({ variant: "h1", css: styles.title({ light }) }, { children: title })), _jsx(Typography, Object.assign({ variant: "h1", css: [styles.title({ light }), styles.watermark] }, { children: title }))] })));
};
