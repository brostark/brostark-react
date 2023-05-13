import React from "react";
import { WatermarkTitle } from "../../components/WatermarkTitle/WatermarkTitle";
import { styles } from "./authView.styles";
import { Spacer } from "../../components/Spacer/Spacer";
import { Paper } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../contexts/appContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RESERVED_ROUTES } from "../../constant";
import { AuthContext } from "../../contexts";
import { LoginForm } from "./LoginForm";
import { OnRegisterData, RegisterForm } from "./RegisterForm";
import { conditionalCss } from "../../helpers";


export interface AuthViewProps {
  leftContent?: React.ReactNode;
  disableForgetPassword?: boolean;
  disableRegister?: boolean;
  displayRegister?: boolean;
  withUsername?: boolean;
  onRegister?: (data: OnRegisterData) => unknown;
}


export const AuthView: React.FC<AuthViewProps> = ({
  onRegister,
  leftContent,
  withUsername,
  displayRegister,
  disableRegister,
  disableForgetPassword,
}) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { appName, restrictedRoute, setRestrictedRoute } = useContext(AppContext);
  const withLeftContent: boolean = !!leftContent;

  useEffect(() => {
    if (user) {
      navigate(restrictedRoute || RESERVED_ROUTES.HOME);

      if (restrictedRoute) {
        setRestrictedRoute("");
      }
    }
  }, [user, navigate, restrictedRoute, setRestrictedRoute]);

  return (
    <div css={[styles.root, conditionalCss(!withLeftContent, styles.rootFlex)]}>
      <div css={styles.leftContainer}>
        <Spacer spacing={10} mobileSpacing={6} />
        <WatermarkTitle light title={appName} />

        {leftContent}
      </div>

      <Paper css={styles.formContainer}>
        {!displayRegister && (
          <LoginForm
            disableRegister={disableRegister}
            disableForgetPassword={disableForgetPassword}
          />
        )}

        {displayRegister && (
          <RegisterForm
            onRegister={onRegister}
            withUsername={withUsername}
          />
        )}
      </Paper>
    </div>
  );
}
