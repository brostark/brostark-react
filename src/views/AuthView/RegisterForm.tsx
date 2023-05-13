import React, { ChangeEvent, useMemo } from "react";
import { styles } from "./authView.styles";
import { Spacer } from "../../components/Spacer/Spacer";
import { Grid, Typography, useMediaQuery, Link as MuiLink } from "@mui/material";
import { useState } from "react";
import { InputText } from "../../components/InputText/InputText";
import { useContext } from "react";
import { AppContext } from "../../contexts/appContext";
import { Button } from "../../components/Button/Button";
import { useAuthentication } from "../../hooks/useAuthentication";
import { InputPassword, InputValidations } from "../../components";
import { theme } from "../../lib";
import { useFormValidation } from "../../hooks/useFormValidation";
import Joi from "joi";
import { JoiPassword } from "../../lib/joi";
import { Link } from "react-router-dom";


export interface OnRegisterData {
  email: string;
  password: string;
  username?: string;
}


interface RegisterFormProps {
  withUsername?: boolean;
  onRegister?: (data: OnRegisterData) => unknown;
}


export const RegisterForm: React.FC<RegisterFormProps> = ({
  onRegister,
  withUsername,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [validationVisible, setValidationVisible] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const sm = useMediaQuery(theme.breakpoints.down("md"));
  const { isLoading, appName } = useContext(AppContext);
  const { register } = useAuthentication();

  const usernameSchema = useMemo(() => {
    const schema = Joi.string().alphanum().min(3).max(30);

    return withUsername ? schema.required() : schema.empty();
  }, [withUsername]);

  const validation = useFormValidation({
    username,
    email,
    password,
    confirmPassword,
  }, Joi.object({
    username: usernameSchema,
    confirmPassword: Joi.ref("password"),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: JoiPassword.string().min(8).minOfLowercase(1).minOfUppercase(1).minOfNumeric(1).minOfSpecialCharacters(1).required(),
  }).with("password", "confirmPassword"));

  const handleRegister = async () => {
    validation.validate();

    if (validation.isValid) {
      if (onRegister) {
        onRegister({
          email,
          username,
          password,
        });
      } else {
        register(email, password);
      }
    }
  }

  const createOnFocusHandler = (key: string) => () => setValidationVisible(key);

  const handleInputBlur = () => {
    validation.validate();
    setValidationVisible("");
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);

  return (
    <div css={styles.formContent} id="form">
      <Typography align={sm ? "center" : "left"} variant="h3">Bienvenue sur {appName}!</Typography>
      <Spacer spacing={1} />
      <Typography align={sm ? "center" : "left"} variant="caption">Créez-vous un compte pour commencer l'aventure !</Typography>

      {withUsername && (
        <InputText
          value={username}
          spacing={{ top: 4 }}
          disabled={isLoading}
          placeholder="azerty"
          label="Nom d'utilisateur"
          onBlur={validation.validate}
          onPressEnter={handleRegister}
          onChange={handleUsernameChange}
          success={validation.result.username.isValid}
          errorText={validation.result.username.errors}
        />
      )}

      <InputText
        label="email"
        value={email}
        spacing={{ top: 2 }}
        disabled={isLoading}
        onBlur={validation.validate}
        onChange={handleEmailChange}
        onPressEnter={handleRegister}
        placeholder="email@example.com"
        success={validation.result.email.isValid}
        errorText={validation.result.email.errors}
      />

      <InputValidations
        value={password}
        hidden={validationVisible !== "password"}
        cases={[
          {
            text: "Doit avoir plus de 8 charactères",
            schema: Joi.string().min(8),
          },
          {
            text: "Doit contenir au moins 1 minuscule",
            schema: JoiPassword.string().minOfLowercase(1),
          },
          {
            text: "Doit contenir au moins 1 majuscule",
            schema: JoiPassword.string().minOfUppercase(1),
          },
          {
            text: "Doit contenir au moins 1 chiffre",
            schema: JoiPassword.string().minOfNumeric(1),
          },
          {
            text: "Doit contenir au moins 1 charactère spécial",
            schema: JoiPassword.string().minOfSpecialCharacters(1),
          },
        ]}
      >
        <InputPassword
          value={password}
          label="Mot de passe"
          spacing={{ top: 2 }}
          disabled={isLoading}
          onBlur={handleInputBlur}
          onPressEnter={handleRegister}
          onChange={handlePasswordChange}
          onFocus={createOnFocusHandler("password")}
          success={validation.result.password.isValid}
          error={validation.result.password.errors.length > 0}
        />
      </InputValidations>

      <InputPassword
        spacing={{ top: 2 }}
        disabled={isLoading}
        value={confirmPassword}
        onBlur={handleInputBlur}
        onPressEnter={handleRegister}
        label="Confirmer le mot de passe"
        onChange={handleConfirmPasswordChange}
        success={validation.result.confirmPassword.isValid}
        errorText={validation.result.confirmPassword.errors.length > 0 && "Les mots de passes ne sont pas identiques"}
      />

      <Spacer />

      <Grid container justifyContent="flex-end">
        <Button
          fullWidth
          color="primary"
          spacing={{ top: 2 }}
          disabled={!validation.isValid}
          isLoading={isLoading}
          onClick={handleRegister}
        >
          Continuer
        </Button>
      </Grid>

      <Spacer spacing={4} />

      <Typography align="center">Vous avez déjà un compte ? <MuiLink component={Link} to="/login" sx={{ display: "inline-block" }}>Connectez-vous ici</MuiLink></Typography>
    </div>
  );
}
