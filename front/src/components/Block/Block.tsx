import style from "./Block.module.scss";

interface BlockProps {
  imgSrc: string;
  isLiked?: boolean;
}

export default function Block(props: BlockProps) {
  return (
    <div className={style.block}>
      <div className={style.block__image}>
        <img src={props.imgSrc} alt="Cat image" />
      </div>
      {props.isLiked && <div className={style.block__like}></div>}
    </div>
  );
}

