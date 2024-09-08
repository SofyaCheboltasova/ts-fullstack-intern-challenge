import { RefObject, useEffect, useRef, useState } from "react";
import style from "./Gallery.module.scss";

import { fetchCats } from "../../api/catsApi";
import CatData from "../../types/CatType";
import Block from "../Block/Block";
import { CatResponse } from "../../types/Response";

interface GalleryProps {
  scrollRef: RefObject<HTMLDivElement>;
}

export default function Gallery({ scrollRef }: GalleryProps) {
  const [allCats, setCats] = useState<CatData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMoreCats, setHasMoreCats] = useState<boolean>(true);
  const [emptyPage, setEmptyPage] = useState<boolean>(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCats();
  }, [page]);

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

  async function getCats(): Promise<void> {
    const { cats, error }: CatResponse = await fetchCats(page);

    if (error) {
      setEmptyPage(true);
      setHasMoreCats(false);
    }

    if (cats) {
      setCats((prevCats) => [...prevCats, ...cats]);
      setEmptyPage(false);
    }
    if (cats && cats.length < 100) {
      setHasMoreCats(false);
    }
  }

  return (
    <section className={style.gallery}>
      <div className={style.gallery__blocks}>
        {allCats.map((cat, index) => {
          return <Block key={index} blockData={cat} />;
        })}
      </div>
      {emptyPage && (
        <div className={style.gallery_empty}>Извините, котиков не будет :(</div>
      )}
      {hasMoreCats && <div ref={loaderRef}>... Загружаем еще котиков ...</div>}
    </section>
  );
}

