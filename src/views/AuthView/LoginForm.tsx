import React, { ChangeEvent } from "react";
import { styles } from "./authView.styles";
import { Spacer } from "../../components/Spacer/Spacer";
import { Grid, Link as MuiLink, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { InputText } from "../../components/InputText/InputText";
import { useContext } from "react";
import { AppContext } from "../../contexts/appContext";
import { Button } from "../../components/Button/Button";
import { useAuthentication } from "../../hooks/useAuthentication";
import { Checkbox, InputPassword } from "../../components";
import { theme } from "../../lib";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { isValidEmail } from "../../helpers";


export interface LoginFormProps {
  disableForgetPassword?: boolean;
  disableRegister?: boolean;
}


export const LoginForm: React.FC<LoginFormProps> = ({
  disableRegister,
  disableForgetPassword,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const sm = useMediaQuery(theme.breakpoints.down("md"));
  const { isLoading, appName } = useContext(AppContext);
  const { login } = useAuthentication();

  const isValid = useMemo(() => {
    return isValidEmail(email) && password.length > 3;
  }, [email, password]);

  const handleLogin = async () => {
    if (isValid) {
      await login(email, password, rememberMe);
    }
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleRememberMeChange = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => setRememberMe(checked);

  return (
    <div css={styles.formContent} id="form">
      <Typography align={sm ? "center" : "left"} variant="h3">Bienvenue sur {appName}!</Typography>
      <Spacer spacing={1} />
      <Typography align={sm ? "center" : "left"} variant="caption">Connectez-vous pour continuer l'aventure</Typography>

      <Spacer />

      <InputText
        label="Email"
        value={email}
        spacing={{ top: 2 }}
        onPressEnter={handleLogin}
        onChange={handleEmailChange}
        placeholder="email@example.com"
      />

      <InputPassword
        value={password}
        spacing={{ top: 2 }}
        label="Mot de passe"
        onPressEnter={handleLogin}
        onChange={handlePasswordChange}
      />

      {sm && <Spacer />}

      <div css={styles.checkboxAndRememberContainer}>
        <Checkbox value={rememberMe} onChange={handleRememberMeChange} label="Se souvenir de moi" />
        {sm && <Spacer />}
        {!disableForgetPassword && <MuiLink href="#">Mot de passe oublié ?</MuiLink>}
      </div>

      <Spacer />

      <Grid container justifyContent="flex-end">
        <Button
          fullWidth
          color="primary"
          disabled={!isValid}
          spacing={{ top: 2 }}
          isLoading={isLoading}
          onClick={handleLogin}
        >
          Connexion
        </Button>
      </Grid>

      <Spacer spacing={4} />

      {!disableRegister && <Typography align="center">Vous n'avez pas de compte ? <MuiLink component={Link} to="/register" sx={{ display: "inline-block" }}>Créer un compte ici</MuiLink></Typography>}
    </div>
  );
}
