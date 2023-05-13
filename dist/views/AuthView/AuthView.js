import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { WatermarkTitle } from "../../components/WatermarkTitle/WatermarkTitle";
import { styles } from "./authView.styles";
import { Spacer } from "../../components/Spacer/Spacer";
import { Paper } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../contexts/appContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RESERVED_ROUTES } from "../../constant";
import { AuthContext } from "../../contexts";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { conditionalCss } from "../../helpers";
export const AuthView = ({ onRegister, leftContent, withUsername, displayRegister, disableRegister, disableForgetPassword, }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { appName, restrictedRoute, setRestrictedRoute } = useContext(AppContext);
    const withLeftContent = !!leftContent;
    useEffect(() => {
        if (user) {
            navigate(restrictedRoute || RESERVED_ROUTES.HOME);
            if (restrictedRoute) {
                setRestrictedRoute("");
            }
        }
    }, [user, navigate, restrictedRoute, setRestrictedRoute]);
    return (_jsxs("div", Object.assign({ css: [styles.root, conditionalCss(!withLeftContent, styles.rootFlex)] }, { children: [_jsxs("div", Object.assign({ css: styles.leftContainer }, { children: [_jsx(Spacer, { spacing: 10, mobileSpacing: 6 }), _jsx(WatermarkTitle, { light: true, title: appName }), leftContent] })), _jsxs(Paper, Object.assign({ css: styles.formContainer }, { children: [!displayRegister && (_jsx(LoginForm, { disableRegister: disableRegister, disableForgetPassword: disableForgetPassword })), displayRegister && (_jsx(RegisterForm, { onRegister: onRegister, withUsername: withUsername }))] }))] })));
};
