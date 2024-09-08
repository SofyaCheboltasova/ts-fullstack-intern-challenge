import { useState } from "react";
import style from "./Block.module.scss";
import Like from "../Like/Like";
import CatData from "../../types/CatType";

interface BlockProps {
  blockData: CatData;
  isLiked?: boolean;
}

export default function Block(props: BlockProps) {
  const { id, url } = props.blockData;
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={style.block}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={style.image__wrapper}>
        <img className={style.image} src={url} alt="Cat image" />
      </div>
      {isHovered && (
        <div className={style.block__like}>
          <Like blockId={id} isLiked={isLiked} setIsLiked={setIsLiked} />
        </div>
      )}
    </div>
  );
}

