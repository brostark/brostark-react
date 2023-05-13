import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { InputText } from "./InputText";
export const InputPassword = (props) => {
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const handleTogglePasswordVisibility = () => setPasswordIsVisible(!passwordIsVisible);
    return (_jsx(InputText, Object.assign({ type: passwordIsVisible ? "text" : "password", placeholder: "*****", RightComponent: (_jsx(IconButton, Object.assign({ onClick: handleTogglePasswordVisibility }, { children: passwordIsVisible ? _jsx(VisibilityOff, {}) : _jsx(Visibility, {}) }))) }, props)));
};
