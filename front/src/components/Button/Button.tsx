import style from "./Button.module.scss";

interface ButtonProps {
  href: string;
  text: string;
  isClicked?: boolean;
}

export default function Button(props: ButtonProps) {
  return (
    <a
      href={props.href}
      className={`${style.button} ${props.isClicked && style.clicked}`}
    >
      {props.text}
    </a>
  );
}

