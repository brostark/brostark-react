import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "../../contexts/appContext";
import { ThemeProvider } from "@mui/system";
import { theme } from "../../lib";
import { AuthProvider } from "../../contexts";
export const BrostarkProvider = ({ children, afterLogin, }) => {
    return (_jsx(ThemeProvider, Object.assign({ theme: theme }, { children: _jsx(AppProvider, { children: _jsx(AuthProvider, Object.assign({ afterLogin: afterLogin }, { children: _jsx(Router, { children: children }) })) }) })));
};
