import Button from "../Button/Button";
import style from "./Header.module.scss";

export default function Header() {
  return (
    <header className={style.header}>
      <Button href={"#"} text={"Все котики"} isClicked />
      <Button href={"#"} text={"Любимые котики"} />
    </header>
  );
}

