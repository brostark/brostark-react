import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { createContext, useEffect, useState } from "react";
import { Notification } from "../components/Notification/Notification";
export const AppContext = createContext({
    appName: "",
    isLoading: false,
    restrictedRoute: "",
    scrollDisabled: false,
    setAppName: () => { },
    setIsLoading: () => { },
    setNotification: () => { },
    setScrollDisabled: () => { },
    setRestrictedRoute: () => { },
});
export const AppProvider = ({ children }) => {
    const [appName, setAppName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [scrollDisabled, setScrollDisabled] = useState(false);
    const [restrictedRoute, setRestrictedRoute] = useState("");
    const [notificationOpened, setNotificationOpened] = useState(false);
    const [notificationOptions, setNotificationOptions] = useState({
        type: "success",
        message: "",
    });
    const setNotification = (options) => {
        setNotificationOptions(options);
        setNotificationOpened(true);
    };
    const handleCloseNotification = () => setNotificationOpened(false);
    useEffect(() => {
        const classNameIsContained = document.body.classList.contains("noscroll");
        if (scrollDisabled && !classNameIsContained) {
            document.body.classList.add("noscroll");
        }
        else if (!scrollDisabled && classNameIsContained) {
            document.body.classList.remove("noscroll");
        }
    }, [scrollDisabled]);
    const value = {
        appName,
        isLoading,
        setAppName,
        setIsLoading,
        scrollDisabled,
        setNotification,
        restrictedRoute,
        setScrollDisabled,
        setRestrictedRoute,
    };
    return (_jsxs(AppContext.Provider, Object.assign({ value: value }, { children: [children, _jsx(Notification, { open: notificationOpened, type: notificationOptions.type, onClose: handleCloseNotification, message: notificationOptions.message })] })));
};
