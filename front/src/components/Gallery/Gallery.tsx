import { RefObject, useEffect, useRef, useState } from "react";
import style from "./Gallery.module.scss";

import { fetchCatImage, fetchCats } from "../../api/catsApi";
import { getLikes } from "../../api/likeApi";

import Block from "../Block/Block";
import BlockType from "../../types/BlockType";
import CatType from "../../types/CatType";
import { useAuth } from "../../contexts/AuthContext";

interface GalleryProps {
  type: "all" | "likes";
  scrollRef: RefObject<HTMLDivElement>;
}

export default function Gallery({ type, scrollRef }: GalleryProps) {
  const [blocks, setBlocks] = useState<BlockType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMoreCats, setHasMoreCats] = useState<boolean>(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const { isAuthorized } = useAuth();

  useEffect(() => {
    getCats();
  }, [page, type]);

  useEffect(() => {
    setBlocks([]);
  }, [type]);

  useEffect(() => {
    const handleScroll = async () => {
      if (loaderRef.current) {
        const { bottom } = loaderRef.current.getBoundingClientRect();
        if (bottom <= window.innerHeight && hasMoreCats) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };
    const container = scrollRef.current;
    container && container.addEventListener("scroll", handleScroll);
    return () => {
      container && container.removeEventListener("scroll", handleScroll);
    };
  }, [hasMoreCats, scrollRef]);

  function handleLikeClick(catId: string) {
    if (type === "likes") {
      setBlocks((prevBlocks) =>
        prevBlocks.filter((block) => block.id !== catId)
      );
    }
  }

  function getBlock(id: string, url: string, isLiked: boolean) {
    let newBlock: BlockType = { id, url, isLiked };
    return newBlock;
  }

  async function getCats(): Promise<void> {
    const cats: CatType[] = await fetchCats(page);

    if (type === "all") {
      if (!cats.length) {
        setHasMoreCats(false);
        return;
      }
      setHasMoreCats(cats.length > 100);

      for (const cat of cats) {
        let isLiked = false;
        if (isAuthorized) {
          const likes = await getLikes();
          isLiked = isAuthorized && likes.some((l) => l.cat_id === cat.id);
        }
        const block = getBlock(cat.id, cat.url, isLiked);
        setBlocks((blocks) => [...blocks, block]);
      }
    }

    if (type === "likes") {
      const likes = await getLikes();

      if (!likes.length) {
        setHasMoreCats(false);
        return;
      }
      setHasMoreCats(likes.length > 100);

      for (const like of likes) {
        const url: string = await fetchCatImage(like.cat_id);
        const block = getBlock(like.cat_id, url, true);
        setBlocks((blocks) => [...blocks, block]);
      }
    }
  }

  return (
    <section className={style.gallery}>
      <div className={style.gallery__blocks}>
        {blocks.map((block, index) => {
          return (
            <Block
              key={index}
              data={block}
              onLikeClick={() => handleLikeClick(block.id)}
            />
          );
        })}
      </div>
      {hasMoreCats ? (
        <div ref={loaderRef} className={style.loader}>
          ... Загружаем еще котиков ...
        </div>
      ) : (
        <div className={style.loader}>Извините, котиков больше нет :(</div>
      )}
    </section>
  );
}

