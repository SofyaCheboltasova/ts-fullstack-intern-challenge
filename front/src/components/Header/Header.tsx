import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import style from "./Header.module.scss";
import { useAuth } from "../../contexts/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { isAuthorized, onLogout, setDisplayLogin } = useAuth();

  return (
    <header className={style.header}>
      <div className={style.header__links}>
        <Button
          isClicked
          text={"Все котики"}
          onClick={() => navigate("/cats")}
        />
        {isAuthorized && (
          <Button onClick={() => navigate("/likes")} text={"Любимые котики"} />
        )}
      </div>
      <div className={style.header__login}>
        {isAuthorized ? (
          <Button onClick={onLogout} text="Выйти" />
        ) : (
          <Button onClick={() => setDisplayLogin(true)} text="Войти" />
        )}
      </div>
    </header>
  );
}

