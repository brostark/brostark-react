import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { AppBar, Container, IconButton, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import classNames from "classnames";
import { useContext } from "react";
import { styles } from "./head.styles";
import { Spacer } from "../Spacer/Spacer";
import { useState } from "react";
import { conditionalCss } from "../../helpers/utils";
import { useAuthentication } from "../../hooks/useAuthentication";
import { AppContext } from "../../contexts/appContext";
import { AuthContext } from "../../contexts/authContext";
export const Head = ({ onToggleDrawer, drawerOpened, }) => {
    const [menuAnchor, setMenuAnchor] = useState(null);
    const { logout } = useAuthentication();
    const { user } = useContext(AuthContext);
    const { appName } = useContext(AppContext);
    const handleCloseMenu = () => setMenuAnchor(null);
    const handleOpenMenu = (e) => setMenuAnchor(e.currentTarget);
    return (_jsx(AppBar, Object.assign({ position: "fixed", className: "appbar", elevation: 1, css: [styles.appBar, conditionalCss(drawerOpened, styles.appBarOverlay)] }, { children: _jsx(Container, Object.assign({ maxWidth: false, css: styles.container }, { children: _jsxs(Toolbar, Object.assign({ disableGutters: true }, { children: [_jsx(IconButton, Object.assign({ color: "inherit", "aria-label": "menu", onClick: onToggleDrawer, css: styles.burgerIconButton }, { children: _jsxs("div", Object.assign({ className: classNames({ opened: drawerOpened }), css: styles.burger }, { children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {})] })) })), _jsx(Spacer, { horizontal: true, spacing: 6 }), _jsx(Typography, Object.assign({ variant: "h4" }, { children: appName })), _jsx("div", { css: styles.headFill }), _jsxs("div", Object.assign({ css: styles.headRight }, { children: [_jsx(ListItem, Object.assign({ "aria-haspopup": "true", onClick: handleOpenMenu, css: styles.listItemButton }, { children: _jsx(ListItemButton, { children: _jsx(ListItemText, { children: (user && user.email) || " " }) }) })), _jsx(Typography, { variant: "caption" }), _jsx(Menu, Object.assign({ keepMounted: true, id: "menu-appbar", open: !!menuAnchor, anchorEl: menuAnchor, onClose: handleCloseMenu, sx: {
                                    zIndex: 9999,
                                }, PaperProps: {
                                    sx: {
                                        marginTop: "2px",
                                    }
                                } }, { children: _jsx(MenuItem, Object.assign({ onClick: logout }, { children: "D\u00E9connexion" })) }))] }))] })) })) })));
};
