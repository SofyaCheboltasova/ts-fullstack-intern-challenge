import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import style from "./Header.module.scss";

interface HeaderProps {
  isAuthorized: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

export default function Header({
  isAuthorized,
  onLoginClick,
  onLogoutClick,
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className={style.header}>
      <div className={style.header__links}>
        <Button
          isClicked
          text={"Все котики"}
          onClick={() => navigate("/cats")}
        />
        <Button onClick={() => navigate("/likes")} text={"Любимые котики"} />
      </div>
      <div className={style.header__login}>
        {isAuthorized ? (
          <Button onClick={onLogoutClick} text="Выйти" />
        ) : (
          <Button onClick={onLoginClick} text="Войти" />
        )}
      </div>
    </header>
  );
}

