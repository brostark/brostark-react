import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { Box, List, ListItemButton, ListItemText, Drawer, ListItemIcon } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { DRAWER_WIDTH } from "../../constant";
const styles = {
    box: {
        width: DRAWER_WIDTH,
    }
};
export const MenuDrawer = ({ routes, opened, onClose, }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHomeLocation = location.pathname === "/";
    const createOnClickItem = (item) => () => {
        navigate(item.pathname);
        onClose();
    };
    return (_jsx(Drawer, Object.assign({ anchor: "left", open: !!opened, onClose: onClose, PaperProps: {
            sx: {
                marginTop: '64px',
            }
        } }, { children: _jsx(Box, Object.assign({ role: "presentation", sx: styles.box }, { children: _jsx(List, { children: routes
                    .filter((item) => !item.hidden)
                    .map((item) => {
                    item = item;
                    const active = isHomeLocation ? item.pathname === location.pathname : item.pathname.includes(location.pathname);
                    return (_jsxs(ListItemButton, Object.assign({ selected: active, onClick: createOnClickItem(item) }, { children: [_jsxs(ListItemIcon, Object.assign({ sx: { color: item.color } }, { children: [active && _jsx(item.icon, { htmlColor: item.color }), !active && _jsx(item.iconOutlined, { htmlColor: item.color })] })), _jsx(ListItemText, { sx: { color: item.color }, primary: item.title })] }), `drawer-${item.pathname}`));
                }) }) })) })));
};
