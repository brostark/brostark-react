import React, { createContext, useEffect, useState } from "react";

import { NotificationType, Notification } from "../components/Notification/Notification";


export interface AppProviderProps {
  children?: React.ReactNode;
}

export interface NotificationOptions {
  type: NotificationType
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


export const AppContext = createContext<AppProviderContext>({
  appName: "",
  isLoading: false,
  restrictedRoute: "",
  scrollDisabled: false,
  setAppName: () => {},
  setIsLoading: () => {},
  setNotification: () => {},
  setScrollDisabled: () => {},
  setRestrictedRoute: () => {},
});


export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [appName, setAppName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scrollDisabled, setScrollDisabled] = useState(false);
  const [restrictedRoute, setRestrictedRoute] = useState("");
  const [notificationOpened, setNotificationOpened] = useState(false);
  const [notificationOptions, setNotificationOptions] = useState<NotificationOptions>({
    type: "success",
    message: "",
  });

  const setNotification = (options: NotificationOptions) => {
    setNotificationOptions(options);
    setNotificationOpened(true);
  }

  const handleCloseNotification = () => setNotificationOpened(false);

  useEffect(() => {
    const classNameIsContained = document.body.classList.contains("noscroll");

    if (scrollDisabled && !classNameIsContained) {
      document.body.classList.add("noscroll");
    } else if (!scrollDisabled && classNameIsContained) {
      document.body.classList.remove("noscroll");
    }
  }, [scrollDisabled]);

  const value: AppProviderContext = {
    appName,
    isLoading,
    setAppName,
    setIsLoading,
    scrollDisabled,
    setNotification,
    restrictedRoute,
    setScrollDisabled,
    setRestrictedRoute,
  }

  return (
    <AppContext.Provider value={value}>
      {children}

      <Notification
        open={notificationOpened}
        type={notificationOptions.type}
        onClose={handleCloseNotification}
        message={notificationOptions.message}
      />
    </AppContext.Provider>
  );
}