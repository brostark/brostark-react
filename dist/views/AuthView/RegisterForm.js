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
import { useMemo } from "react";
import { styles } from "./authView.styles";
import { Spacer } from "../../components/Spacer/Spacer";
import { Grid, Typography, useMediaQuery, Link as MuiLink } from "@mui/material";
import { useState } from "react";
import { InputText } from "../../components/InputText/InputText";
import { useContext } from "react";
import { AppContext } from "../../contexts/appContext";
import { Button } from "../../components/Button/Button";
import { useAuthentication } from "../../hooks/useAuthentication";
import { InputPassword, InputValidations } from "../../components";
import { theme } from "../../lib";
import { useFormValidation } from "../../hooks/useFormValidation";
import Joi from "joi";
import { JoiPassword } from "../../lib/joi";
import { Link } from "react-router-dom";
export const RegisterForm = ({ onRegister, withUsername, }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [validationVisible, setValidationVisible] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const sm = useMediaQuery(theme.breakpoints.down("md"));
    const { isLoading, appName } = useContext(AppContext);
    const { register } = useAuthentication();
    const usernameSchema = useMemo(() => {
        const schema = Joi.string().alphanum().min(3).max(30);
        return withUsername ? schema.required() : schema.empty();
    }, [withUsername]);
    const validation = useFormValidation({
        username,
        email,
        password,
        confirmPassword,
    }, Joi.object({
        username: usernameSchema,
        confirmPassword: Joi.ref("password"),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: JoiPassword.string().min(8).minOfLowercase(1).minOfUppercase(1).minOfNumeric(1).minOfSpecialCharacters(1).required(),
    }).with("password", "confirmPassword"));
    const handleRegister = () => __awaiter(void 0, void 0, void 0, function* () {
        validation.validate();
        if (validation.isValid) {
            if (onRegister) {
                onRegister({
                    email,
                    username,
                    password,
                });
            }
            else {
                register(email, password);
            }
        }
    });
    const createOnFocusHandler = (key) => () => setValidationVisible(key);
    const handleInputBlur = () => {
        validation.validate();
        setValidationVisible("");
    };
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    return (_jsxs("div", Object.assign({ css: styles.formContent, id: "form" }, { children: [_jsxs(Typography, Object.assign({ align: sm ? "center" : "left", variant: "h3" }, { children: ["Bienvenue sur ", appName, "!"] })), _jsx(Spacer, { spacing: 1 }), _jsx(Typography, Object.assign({ align: sm ? "center" : "left", variant: "caption" }, { children: "Cr\u00E9ez-vous un compte pour commencer l'aventure !" })), withUsername && (_jsx(InputText, { value: username, spacing: { top: 4 }, disabled: isLoading, placeholder: "azerty", label: "Nom d'utilisateur", onBlur: validation.validate, onPressEnter: handleRegister, onChange: handleUsernameChange, success: validation.result.username.isValid, errorText: validation.result.username.errors })), _jsx(InputText, { label: "email", value: email, spacing: { top: 2 }, disabled: isLoading, onBlur: validation.validate, onChange: handleEmailChange, onPressEnter: handleRegister, placeholder: "email@example.com", success: validation.result.email.isValid, errorText: validation.result.email.errors }), _jsx(InputValidations, Object.assign({ value: password, hidden: validationVisible !== "password", cases: [
                    {
                        text: "Doit avoir plus de 8 charactères",
                        schema: Joi.string().min(8),
                    },
                    {
                        text: "Doit contenir au moins 1 minuscule",
                        schema: JoiPassword.string().minOfLowercase(1),
                    },
                    {
                        text: "Doit contenir au moins 1 majuscule",
                        schema: JoiPassword.string().minOfUppercase(1),
                    },
                    {
                        text: "Doit contenir au moins 1 chiffre",
                        schema: JoiPassword.string().minOfNumeric(1),
                    },
                    {
                        text: "Doit contenir au moins 1 charactère spécial",
                        schema: JoiPassword.string().minOfSpecialCharacters(1),
                    },
                ] }, { children: _jsx(InputPassword, { value: password, label: "Mot de passe", spacing: { top: 2 }, disabled: isLoading, onBlur: handleInputBlur, onPressEnter: handleRegister, onChange: handlePasswordChange, onFocus: createOnFocusHandler("password"), success: validation.result.password.isValid, error: validation.result.password.errors.length > 0 }) })), _jsx(InputPassword, { spacing: { top: 2 }, disabled: isLoading, value: confirmPassword, onBlur: handleInputBlur, onPressEnter: handleRegister, label: "Confirmer le mot de passe", onChange: handleConfirmPasswordChange, success: validation.result.confirmPassword.isValid, errorText: validation.result.confirmPassword.errors.length > 0 && "Les mots de passes ne sont pas identiques" }), _jsx(Spacer, {}), _jsx(Grid, Object.assign({ container: true, justifyContent: "flex-end" }, { children: _jsx(Button, Object.assign({ fullWidth: true, color: "primary", spacing: { top: 2 }, disabled: !validation.isValid, isLoading: isLoading, onClick: handleRegister }, { children: "Continuer" })) })), _jsx(Spacer, { spacing: 4 }), _jsxs(Typography, Object.assign({ align: "center" }, { children: ["Vous avez d\u00E9j\u00E0 un compte ? ", _jsx(MuiLink, Object.assign({ component: Link, to: "/login", sx: { display: "inline-block" } }, { children: "Connectez-vous ici" }))] }))] })));
};
