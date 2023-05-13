import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { Add, ArrowUpward } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { conditionalCss } from "../../helpers/utils";
import { styles } from "./floatingActions.styles";
export const FloatingActions = ({ add, }) => {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const navigate = useNavigate();
    const onClickAdd = () => {
        if (typeof add === "string") {
            navigate(add);
            return;
        }
        add();
    };
    const handleWindowScroll = useCallback(() => {
        if (!showScrollTop && window.scrollY >= window.innerHeight) {
            setShowScrollTop(true);
        }
        else if (showScrollTop && window.scrollY <= window.innerHeight * 0.5) {
            setShowScrollTop(false);
        }
    }, [showScrollTop]);
    const handleScrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
    useEffect(() => {
        window.addEventListener("scroll", handleWindowScroll);
        handleWindowScroll();
        return () => {
            window.removeEventListener("scroll", handleWindowScroll);
        };
    }, [handleWindowScroll]);
    return (_jsxs("div", Object.assign({ css: styles.floatingActionContainer }, { children: [add && (_jsx(Fab, Object.assign({ color: "primary", "aria-label": "add", onClick: onClickAdd }, { children: _jsx(Add, { htmlColor: "white" }) }))), _jsx(Fab, Object.assign({ size: "small", color: "primary", "aria-label": "Return to top", onClick: handleScrollTop, css: [styles.floatingActionTop, conditionalCss(showScrollTop, styles.floatingActionTopVisible)] }, { children: _jsx(ArrowUpward, {}) }))] })));
};
