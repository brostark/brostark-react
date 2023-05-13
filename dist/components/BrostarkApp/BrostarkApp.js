import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthView } from "../../views/AuthView/AuthView";
import { AppContext } from "../../contexts/appContext";
import { RESERVED_ROUTES } from "../../constant";
import { LayoutView } from "../../views";
import { NotFoundView } from "../../views/NotFoundView";
export const BrostarkApp = ({ appName, children, className, authProps, layoutProps, routes = [], }) => {
    const { setAppName } = useContext(AppContext);
    const location = useLocation();
    const [title, setTitle] = useState(appName);
    useEffect(() => {
        setAppName(appName);
    }, [appName, setAppName]);
    useEffect(() => {
        const activeRoute = routes.find(route => route.pathname === location.pathname);
        setTitle(`${appName}${activeRoute ? ` - ${activeRoute.title}` : ""}`);
    }, [appName, location, routes]);
    return (_jsxs(_Fragment, { children: [_jsxs(Helmet, { children: [_jsx("meta", { charSet: "utf-8" }), _jsx("title", { children: title })] }), _jsxs(Routes, { children: [_jsx(Route, { path: RESERVED_ROUTES.LOGIN, element: _jsx(AuthView, Object.assign({}, authProps, { displayRegister: false })) }), _jsx(Route, { path: RESERVED_ROUTES.REGISTER, element: _jsx(AuthView, Object.assign({}, authProps, { displayRegister: true })) }), _jsx(Route, { path: RESERVED_ROUTES.NOTFOUND, element: _jsx(NotFoundView, {}) }), _jsx(Route, { path: "/*", element: _jsx(LayoutView, Object.assign({ className: className, routes: routes }, layoutProps)) })] }), children] }));
};
