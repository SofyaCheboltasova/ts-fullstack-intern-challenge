import style from "./Button.module.scss";

interface ButtonProps {
  text: string;
  onClick: () => void;
  isClicked?: boolean;
}

export default function Button(props: ButtonProps) {
  return (
    <div
      onClick={props.onClick}
      className={`${style.button} ${props.isClicked && style.clicked}`}
    >
      {props.text}
    </div>
  );
}

