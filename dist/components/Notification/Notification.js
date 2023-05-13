import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { Alert, Snackbar } from "@mui/material";
export const Notification = ({ open, type, message, onClose, }) => {
    return (_jsx(Snackbar, Object.assign({ open: open, onClose: onClose, anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
        } }, { children: _jsx(Alert, Object.assign({ severity: type, onClose: onClose }, { children: message })) })));
};
