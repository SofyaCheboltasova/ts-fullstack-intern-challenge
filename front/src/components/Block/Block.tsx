import { useState } from "react";
import style from "./Block.module.scss";
import Like from "../Like/Like";
import { useAuth } from "../../contexts/AuthContext";
import CatData from "../../types/catData";

interface BlockProps {
  blockData: CatData;
  isLiked?: boolean;
}

export default function Block(props: BlockProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { isAuthorized, setDisplayLogin } = useAuth();

  function onLikeClick() {
    if (isAuthorized) {
      setIsLiked(true);

      // Запрос к апи
    } else {
      setDisplayLogin(true);
      setIsLiked(true);
    }
  }

  return (
    <div
      className={style.block}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={style.image__wrapper}>
        <img
          className={style.image}
          src={props.blockData.url}
          alt="Cat image"
        />
      </div>
      {isHovered && (
        <div className={style.block__like}>
          <Like onClick={onLikeClick} isLiked={isLiked} />
        </div>
      )}
    </div>
  );
}

