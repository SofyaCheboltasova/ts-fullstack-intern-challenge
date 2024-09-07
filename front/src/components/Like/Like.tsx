import style from "./Like.module.scss";

interface LikeProps {
  isLiked: boolean;
  onClick: () => void;
}

export default function Like({ isLiked, onClick }: LikeProps) {
  return (
    <div
      className={`${style.like} ${isLiked ? style.filled : style.empty}`}
      onClick={onClick}
    ></div>
  );
}

