import React from "react";
export type NotificationType = "success" | "error" | "warning" | "info";
interface NotificationProps {
    open?: boolean;
    message?: string;
    type: NotificationType;
    onClose: () => void;
}
export declare const Notification: React.FC<NotificationProps>;
export {};
//# sourceMappingURL=Notification.d.ts.map