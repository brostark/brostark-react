import React, { ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { AppProvider } from "../../contexts/appContext";
import { ThemeProvider } from "@mui/system";
import { theme } from "../../lib";
import { AuthProvider } from "../../contexts";
import { DefaultUser } from "../../lib/types/user";


interface AppProps {
  children?: ReactNode;
  afterLogin?: (uid: string, setUser: ((user: DefaultUser) => void)) => Promise<void>;
}


export const BrostarkProvider: React.FC<AppProps> = ({
  children,
  afterLogin,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <AuthProvider afterLogin={afterLogin}>
            <Router>
              {children}
            </Router>
        </AuthProvider>
      </AppProvider>
    </ThemeProvider>
  )
};
