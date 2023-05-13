import { Breakpoint, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { ReactNode } from "react";
import { Button } from "../Button/Button";
import { Spacer } from "../Spacer/Spacer";


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

export const Modal: React.FC<ModalProps> = ({
  open,
  title,
  onClose,
  children,
  onCancel,
  onSubmit,
  isLoading,
  className,
  fullScreen,
  disableClickOutside,
  maxWidth = "md",
  isSubmitable = true,
  submitLabel = "OK",
  cancelLabel = "Annuler",
}) => {
  return (
    <Dialog
      fullWidth
      open={!!open}
      maxWidth={maxWidth}
      className={className}
      fullScreen={fullScreen}
      onClose={disableClickOutside ? undefined : onClose}
    >
      {title && <DialogTitle variant="h3">{title}</DialogTitle>}
      <DialogContent>
        {title && <Spacer />}

        {children}
      </DialogContent>

      <DialogActions>
        {onCancel && <Button disabled={isLoading} onClick={onCancel} color="secondary">{cancelLabel}</Button>}
        {onSubmit && <Button isLoading={isLoading} disabled={!isSubmitable} onClick={onSubmit} color="primary">{submitLabel}</Button>}
      </DialogActions>
    </Dialog>
  )
}
