import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs as MuiBreadcrumbs, Link as MuiLink, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getBreadcrumbDatas } from "./breadcrumbs.utils";
import { styles } from "./breadcrumbs.styles";
export const Breadcrumbs = ({ routes = [], }) => {
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    useEffect(() => {
        setBreadcrumbs(getBreadcrumbDatas(location.pathname, routes));
    }, [location, routes]);
    if (!routes.length) {
        return null;
    }
    return (_jsx(MuiBreadcrumbs, Object.assign({ css: styles.root, "aria-label": "breadcrumb" }, { children: breadcrumbs.map((breadcrumb, index) => {
            if (index === (breadcrumbs.length - 1)) {
                return _jsx(Typography, { children: breadcrumb.label });
            }
            return (_jsx(MuiLink, Object.assign({ component: Link, to: breadcrumb.pathname, underline: "hover", color: "inherit" }, { children: breadcrumb.label })));
        }) })));
};
