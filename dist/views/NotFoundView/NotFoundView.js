import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { Typography } from "@mui/material";
import { Button } from "../../components";
import { RESERVED_ROUTES } from "../../constant";
import { styles } from "./notFoundView.styles";
export const NotFoundView = () => {
    return (_jsxs("div", Object.assign({ css: styles.root }, { children: [_jsx(Typography, Object.assign({ align: "center", variant: "h1", css: styles.h1 }, { children: "404" })), _jsx(Typography, Object.assign({ align: "center", variant: "h2", sx: { marginTop: 4 } }, { children: "Page Not Found" })), _jsx(Typography, Object.assign({ align: "center", sx: { marginTop: 2 } }, { children: "We couldn't find the page you are looking for." })), _jsx(Button, Object.assign({ color: "primary", variant: "outlined", spacing: { top: 8 }, to: RESERVED_ROUTES.HOME }, { children: "Back to home" }))] })));
};
