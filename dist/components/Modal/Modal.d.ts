import { Breakpoint } from "@mui/material";
import React, { ReactNode } from "react";
export interface ModalProps {
    open?: boolean;
    title?: string;
    className?: string;
    isLoading?: boolean;
    onClose: () => void;
    children?: ReactNode;
    onCancel?: () => void;
    onSubmit?: () => void;
    submitLabel?: ReactNode;
    cancelLabel?: ReactNode;
    isSubmitable?: boolean;
    fullScreen?: boolean;
    disableClickOutside?: boolean;
    maxWidth?: false | Breakpoint;
}
export declare const Modal: React.FC<ModalProps>;
//# sourceMappingURL=Modal.d.ts.map