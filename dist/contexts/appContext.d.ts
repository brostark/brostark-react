import React from "react";
import { NotificationType } from "../components/Notification/Notification";
export interface AppProviderProps {
    children?: React.ReactNode;
}
export interface NotificationOptions {
    type: NotificationType;
    message: string;
}
export interface AppProviderContext {
    appName: string;
    isLoading?: boolean;
    restrictedRoute?: string;
    scrollDisabled?: boolean;
    setAppName: (appName: string) => void;
    setIsLoading: (isLoading: boolean) => void;
    setRestrictedRoute: (route: string) => void;
    setScrollDisabled: (scrollDisabled: boolean) => void;
    setNotification: (options: NotificationOptions) => void;
}
export declare const AppContext: React.Context<AppProviderContext>;
export declare const AppProvider: React.FC<AppProviderProps>;
//# sourceMappingURL=appContext.d.ts.map