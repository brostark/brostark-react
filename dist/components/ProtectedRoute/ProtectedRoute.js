import { jsx as _jsx, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RESERVED_ROUTES } from "../../constant";
import { AuthContext } from "../../contexts";
import { AppContext } from "../../contexts/appContext";
export const ProtectedRoute = ({ role, children, connected = true, }) => {
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const { setRestrictedRoute } = useContext(AppContext);
    if ((!!connected || !!role) && !user) {
        setRestrictedRoute(location.pathname + location.search + location.hash);
        return _jsx(Navigate, { to: RESERVED_ROUTES.LOGIN });
    }
    if (role && role !== (user === null || user === void 0 ? void 0 : user.role)) {
        setRestrictedRoute(location.pathname + location.search + location.hash);
        return _jsx(Navigate, { to: RESERVED_ROUTES.NOTFOUND });
    }
    return _jsx(_Fragment, { children: children });
};
