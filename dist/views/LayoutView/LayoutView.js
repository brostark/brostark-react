import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import { Head } from "../../components/Head/Head";
import { MenuDrawer } from "../../components/MenuDrawer/MenuDrawer";
import { ProtectedRoute } from "../../components/ProtectedRoute/ProtectedRoute";
import { styles } from "./layoutView.styles";
export const LayoutView = ({ style, routes, className, disableHead, disableDrawer, disableBreadcrumbs, }) => {
    const [drawerOpened, setDrawerOpened] = useState(false);
    const handleToggleDrawer = () => setDrawerOpened(!drawerOpened);
    const handleCloseDrawer = () => setDrawerOpened(false);
    return (_jsxs(_Fragment, { children: [!disableHead && (_jsx(Head, { drawerOpened: drawerOpened, onToggleDrawer: handleToggleDrawer })), !disableDrawer && (_jsx(MenuDrawer, { routes: routes, opened: drawerOpened, onClose: handleCloseDrawer })), _jsxs("main", Object.assign({ className: className, css: [styles.root, style] }, { children: [!disableBreadcrumbs && _jsx(Breadcrumbs, { routes: routes }), _jsx(Routes, { children: routes.map((route) => {
                            const protectedRouteProps = {
                                role: undefined,
                                connected: undefined,
                            };
                            if (typeof route.restriction === "undefined") {
                                protectedRouteProps.connected = true;
                            }
                            else if (typeof route.restriction === "string") {
                                protectedRouteProps.connected = true;
                                protectedRouteProps.role = route.restriction;
                            }
                            else if (!route.restriction) {
                                protectedRouteProps.connected = false;
                            }
                            return (_jsxs(React.Fragment, { children: [_jsx(Route, { path: route.pathname, element: (_jsx(ProtectedRoute, Object.assign({}, protectedRouteProps, { children: route.component }))) }), Array.isArray(route.children) && route.children.map((routeChild) => {
                                        const pathname = `${route.pathname}${routeChild.pathname}`;
                                        const key = `childroute-${pathname}`;
                                        return (_jsx(Route, { path: pathname, element: (_jsx(ProtectedRoute, Object.assign({ connected: true }, { children: routeChild.component }))) }, key));
                                    })] }, route.pathname));
                        }) })] }))] }));
};
