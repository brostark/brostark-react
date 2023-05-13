var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsxs as _jsxs, jsx as _jsx } from "@emotion/react/jsx-runtime";
import { styles } from "./authView.styles";
import { Spacer } from "../../components/Spacer/Spacer";
import { Grid, Link as MuiLink, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { InputText } from "../../components/InputText/InputText";
import { useContext } from "react";
import { AppContext } from "../../contexts/appContext";
import { Button } from "../../components/Button/Button";
import { useAuthentication } from "../../hooks/useAuthentication";
import { Checkbox, InputPassword } from "../../components";
import { theme } from "../../lib";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { isValidEmail } from "../../helpers";
export const LoginForm = ({ disableRegister, disableForgetPassword, }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const sm = useMediaQuery(theme.breakpoints.down("md"));
    const { isLoading, appName } = useContext(AppContext);
    const { login } = useAuthentication();
    const isValid = useMemo(() => {
        return isValidEmail(email) && password.length > 3;
    }, [email, password]);
    const handleLogin = () => __awaiter(void 0, void 0, void 0, function* () {
        if (isValid) {
            yield login(email, password, rememberMe);
        }
    });
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleRememberMeChange = (e, checked) => setRememberMe(checked);
    return (_jsxs("div", Object.assign({ css: styles.formContent, id: "form" }, { children: [_jsxs(Typography, Object.assign({ align: sm ? "center" : "left", variant: "h3" }, { children: ["Bienvenue sur ", appName, "!"] })), _jsx(Spacer, { spacing: 1 }), _jsx(Typography, Object.assign({ align: sm ? "center" : "left", variant: "caption" }, { children: "Connectez-vous pour continuer l'aventure" })), _jsx(Spacer, {}), _jsx(InputText, { label: "Email", value: email, spacing: { top: 2 }, onPressEnter: handleLogin, onChange: handleEmailChange, placeholder: "email@example.com" }), _jsx(InputPassword, { value: password, spacing: { top: 2 }, label: "Mot de passe", onPressEnter: handleLogin, onChange: handlePasswordChange }), sm && _jsx(Spacer, {}), _jsxs("div", Object.assign({ css: styles.checkboxAndRememberContainer }, { children: [_jsx(Checkbox, { value: rememberMe, onChange: handleRememberMeChange, label: "Se souvenir de moi" }), sm && _jsx(Spacer, {}), !disableForgetPassword && _jsx(MuiLink, Object.assign({ href: "#" }, { children: "Mot de passe oubli\u00E9 ?" }))] })), _jsx(Spacer, {}), _jsx(Grid, Object.assign({ container: true, justifyContent: "flex-end" }, { children: _jsx(Button, Object.assign({ fullWidth: true, color: "primary", disabled: !isValid, spacing: { top: 2 }, isLoading: isLoading, onClick: handleLogin }, { children: "Connexion" })) })), _jsx(Spacer, { spacing: 4 }), !disableRegister && _jsxs(Typography, Object.assign({ align: "center" }, { children: ["Vous n'avez pas de compte ? ", _jsx(MuiLink, Object.assign({ component: Link, to: "/register", sx: { display: "inline-block" } }, { children: "Cr\u00E9er un compte ici" }))] }))] })));
};
