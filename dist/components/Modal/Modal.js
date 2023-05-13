import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Button } from "../Button/Button";
import { Spacer } from "../Spacer/Spacer";
export const Modal = ({ open, title, onClose, children, onCancel, onSubmit, isLoading, className, fullScreen, disableClickOutside, maxWidth = "md", isSubmitable = true, submitLabel = "OK", cancelLabel = "Annuler", }) => {
    return (_jsxs(Dialog, Object.assign({ fullWidth: true, open: !!open, maxWidth: maxWidth, className: className, fullScreen: fullScreen, onClose: disableClickOutside ? undefined : onClose }, { children: [title && _jsx(DialogTitle, Object.assign({ variant: "h3" }, { children: title })), _jsxs(DialogContent, { children: [title && _jsx(Spacer, {}), children] }), _jsxs(DialogActions, { children: [onCancel && _jsx(Button, Object.assign({ disabled: isLoading, onClick: onCancel, color: "secondary" }, { children: cancelLabel })), onSubmit && _jsx(Button, Object.assign({ isLoading: isLoading, disabled: !isSubmitable, onClick: onSubmit, color: "primary" }, { children: submitLabel }))] })] })));
};
