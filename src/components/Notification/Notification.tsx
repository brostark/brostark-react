import { Alert, Snackbar } from "@mui/material";
import React from "react";


export type NotificationType = "success" | "error" | "warning" | "info";


interface NotificationProps {
  open?: boolean;
  message?: string;
  type: NotificationType;
  onClose: () => void;
}


export const Notification: React.FC<NotificationProps> = ({
  open,
  type,
  message,
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Alert severity={type} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}
