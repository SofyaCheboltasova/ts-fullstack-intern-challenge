import { useState } from "react";
import Input from "../Input/Input";
import style from "./AuthWindow.module.scss";
import { createUser } from "../../api/api";

interface AuthWindowProps {
  onLogin: (token: string) => void;
  onClose: () => void;
}

export default function AuthWindow(props: AuthWindowProps) {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loginError, setLoginError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  function handleLoginSubmit(value: string) {
    if (value.length < 8) {
      setLoginError("Логин должен быть не короче 8 символов");
    } else {
      setLoginError(null);
      setLogin(value);
    }
  }

  function handlePasswordSubmit(value: string) {
    if (value.length < 8) {
      setPasswordError("Пароль должен быть не короче 8 символов");
    } else {
      setPasswordError(null);
      setPassword(value);
    }
  }

  async function handleButtonClick() {
    if (login && password) {
      const { token, error } = await createUser(login, password);
      console.error(error);

      if (token) {
        props.onLogin(token);
        props.onClose();
      }

      if (error) {
        setPasswordError(error);
      }
    }
  }

  return (
    <>
      <div className={style.background} onClick={props.onClose}></div>

      <div className={style.auth__wrapper}>
        <div>Авторизация</div>
        <div className={style.auth__inputs}>
          <Input
            placeholder={"Логин"}
            type={"text"}
            onSubmit={handleLoginSubmit}
            error={loginError !== null}
          />
          {loginError && <div className={style.auth__error}>{loginError}</div>}

          <Input
            placeholder={"Пароль"}
            type={"password"}
            onSubmit={handlePasswordSubmit}
            error={passwordError !== null}
          />
          {passwordError && (
            <div className={style.auth__error}>{passwordError}</div>
          )}
        </div>
        <button className={style.auth__button} onClick={handleButtonClick}>
          Войти
        </button>
      </div>
    </>
  );
}

